const db = require('../config/database');
const moment = require('moment');

exports.addFollowUpController = async (req, res) => {
  try {

    const { student_id, message, follow_date, created_by, status, last_status } = req.body;

    console.log(req.body);


    if (!student_id || !message) {
      return res.status(400).json({
        message: "Student ID and message are required",
      });
    }


    const followUpData = {
      student_id,
      message,
      follow_date: follow_date || moment().format('YYYY-MM-DD HH:mm:ss'),
      status: status || 1,
      created_by: created_by,
      last_status: last_status,
    };


    const query = `
      INSERT INTO imts_erp_student_followup 
      (student_id, message, follow_date, status, created_by, last_status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
      followUpData.student_id,
      followUpData.message,
      followUpData.follow_date,
      followUpData.status,
      followUpData.created_by,
      followUpData.created_at,
      followUpData.last_status,
    ];


    await db.query(query, values);


    res.status(201).json({
      message: "Follow-up added successfully",
    });
  } catch (error) {
    console.error("Follow-up error:", error);
    res.status(500).json({
      message: "Failed to add follow-up",
      error: error.message,
    });
  }
};
exports.getFollowUpByStudentId = async (req, res) => {
  try {
    const { student_id } = req.params;

    if (!student_id) {
      return res.status(400).json({
        message: "Student ID is required",
      });
    }

 const queryStr = `
        SELECT t4.name as name, t1.student_id, t1.message,  DATE_FORMAT(t1.follow_date, '%d %b %Y') AS follow_date,
    DATE_FORMAT(t1.follow_date, '%l %p') AS follow_time, t1.status, t2.email as created_by, t1.created_at,t3.name as laststatus
        FROM imts_erp_student_followup t1
        left join imts_erp_user t2 on t2.id=t1.created_by
        left join imts_erp_laststatus t3 on t3.id=t1.last_status
        left join imts_erp_student t4  on t4.id=t1.student_id
        WHERE t1.student_id =?
      `;



    console.log("Executing query with student_id:", student_id);


    const followUps = await db.query(queryStr, [student_id]);
    console.log("Query result:", followUps);




    return res.status(200).json({
      message: "Follow-ups fetched successfully",
      data: followUps,
    });
  } catch (error) {
    console.error("Get follow-up by student ID error:", error);
    return res.status(500).json({
      message: "Failed to fetch follow-ups",
      error: error.message,
    });
  }
};

exports.updateFollowUpByStudentId = async (req, res) => {
  const student_id = req.params.student_id;
  const updatedData = req.body;


  if (!student_id) {
    return res.status(400).json({ error: "Student ID is required" });
  }

  if (!updatedData) {
    return res.status(400).json({ error: "Updated data is required" });
  }


  const queryStr = `
      UPDATE imts_erp_student_followup
      SET
        status = ?, 
        message = ?, 
        uid = ?, 
        follow_date = ?, 
        created_by = ?, 
        created_at = ?, 
        last_status = ?
      WHERE student_id = ?
    `;


  const values = [
    updatedData.status || null,
    updatedData.message || null,
    updatedData.uid || null,
    updatedData.follow_date || null,
    updatedData.created_by || null,
    updatedData.created_at || new Date(),
    updatedData.last_status || null,
    student_id,
  ];

  try {

    console.log("SQL Query:", queryStr);
    console.log("Values:", values);

    const result = await db.query(queryStr, values);

    console.log("Update result:", result);


    if (result.affectedRows > 0) {
      return res.status(200).json({ message: "Follow-up updated successfully" });
    } else {
      return res.status(404).json({ error: "No follow-up found for the given student ID" });
    }
  } catch (error) {
    console.error("Error in updateFollowUp:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};