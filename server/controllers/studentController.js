const { log } = require("console");
const db = require("../config/database");
const moment = require('moment');
const util = require("util"); // For promisifying db.query
function ConvertArrayToString(arr) {
  let str = arr.map(email => `'${email}'`).join(', ');
  return str;
}
exports.getStudentsForExcel = async (req, res) => {


  const { full_name,
    enrollment_number,
    counselor_name,
    phone_number,
    alternate_phone,
    email,
    session_to,
    session_from,
    alternate_email,
    university,
    course,
    specialization,
    responsible_person,
    manager,
    follow_up,
    follow_up_custom_date,
    payment1,
    payment2,
    exammode,
    admissionconfirmation,
    admissiondate,
    admissionbatch,
    lastexammode,
    status,
    mode
  } = req.body.data;
  const { page = 1, limit = 10 } = req.body.data;
  const offset = (page - 1) * limit;
  const Id = req.body.Id || [];

  const studentId = Id.map(() => '?').join(', ');


  console.log(req.body);
  const today = moment().format('YYYY-MM-DD');
  let countQuery = `
   SELECT COUNT(*) as total 
        FROM imts_erp_student s 
 JOIN imts_erp_admission_confirmation_status a on a.id=s.admission_confirmation_status_id 
 JOIN imts_erp_student_assigned_follow_pdc follow on follow.student_id=s.id 
LEFT JOIN imts_erp_admission_confirmation_status acs ON s.admission_confirmation_status_id = acs.id
JOIN imts_erp_student_assigned_follow_pdc sf on sf.student_id=s.id
LEFT JOIN imts_erp_user u ON u.id = s.created_by
LEFT JOIN imts_erp_student_personal sp ON s.id = sp.student_id
LEFT JOIN imts_erp_university univ ON s.university_id = univ.id
LEFT JOIN imts_erp_course c ON s.course_id = c.id
LEFT JOIN imts_erp_specialization spec ON s.specialization_id = spec.id
LEFT JOIN imts_erp_counsellor rp ON rp.id = s.responsable_person_id
LEFT JOIN imts_erp_manager m ON m.id = rp.manager_id

    `;

  let query = `
   SELECT 

    s.id as student_id,
    COALESCE(u.full_name, '') as counselor_name,
    s.name as student_name,
    s.phone,
    s.email,
    s.user_id,
    s.batch_changing,
    s.admission_no,
    rp.full_name as responsable_person,
    s.alternate_email,
    
  DATE_FORMAT(date_of_birth, '%d %b %Y') as date_of_birth,
    s.alternate_phone,
    univ.name as university_name,
    c.name as course_name,
    spec.name as specialization_name,
    m.full_name as manager_name,
   (
    case s.exam_mode
    when 1 then 'Annual'
    when 2 then 'Semester'
    end
) as exam_mode,
    s.session_from,
    s.session_to,
    s.status,
    s.batch_change,
    s.last_exam_mode,
    s.last_exam_given,
    s.last_exam_date,
    s.last_exam_fees,
    acs.name as admission_status

    
FROM imts_erp_student as s

 JOIN imts_erp_admission_confirmation_status acs ON s.admission_confirmation_status_id = acs.id
JOIN imts_erp_student_assigned_follow_pdc sf on sf.student_id=s.id
LEFT JOIN imts_erp_user u ON u.id = s.created_by
LEFT JOIN imts_erp_student_personal sp ON s.id = sp.student_id
LEFT JOIN imts_erp_university univ ON s.university_id = univ.id
LEFT JOIN imts_erp_course c ON s.course_id = c.id
LEFT JOIN imts_erp_specialization spec ON s.specialization_id = spec.id
LEFT JOIN imts_erp_counsellor rp ON rp.id = s.responsable_person_id
LEFT JOIN imts_erp_manager m ON m.id = rp.manager_id
 `;
  
  let values = [];
  let countValues = [];
  try {
    if ((follow_up && follow_up != "") || (follow_up_custom_date && follow_up_custom_date != "")) {
      query += `
      LEFT JOIN imts_erp_student_followup follow ON follow.student_id = s.id
      `;
      countQuery += `
      LEFT JOIN imts_erp_student_followup follow ON follow.student_id = s.id

      `;
    }
    if ((payment1 && payment1 != "") || (payment2 && payment2 != "") || (admissiondate && admissiondate != "")) {
      query += `
      LEFT JOIN imts_erp_student_payment sps ON sps.student_id = s.id
      `;
      countQuery += `
       LEFT JOIN imts_erp_student_payment sps ON sps.student_id = s.id

      `;
    }

    if (Id.length > 0) {
      query += `
  WHERE ( acs.name='RECEIVED' OR acs.name='SENT') and sf.follow_status='3'
 and s.id in  (${studentId})
  `;
      values.push(...Id);
      console.log("This is Studnet");
    }
    else {
      query += `
  WHERE ( acs.name='RECEIVED' OR acs.name='SENT') and sf.follow_status='3'
  `;
    }
    countQuery += `
  WHERE ( a.name='RECEIVED' OR a.name='SENT') and follow.follow_status='3'
  `
    if (full_name && full_name != "") {
      query += `and trim(s.name)=?`;
      values.push(full_name.trim());

      countQuery += `and trim(s.name)=?`;
      countValues.push(full_name.trim());

    }
    if (exammode && exammode != "") {
      const placeholders = exammode.map(() => '?').join(', '); // Create placeholders for query
      query += `and s.exam_mode IN (${placeholders})`; // Add IN clause
      values.push(...exammode);

      countValues += `and s.exam_mode IN (${placeholders})`; // Add IN clause
      countQuery.push(...exammode);

    }
    if (admissionbatch && admissionbatch != "") {
      const placeholders = admissionbatch.map(() => '?').join(', '); // Create placeholders for query
      query += `and s.exam_batch_id IN (${placeholders})`; // Add IN clause
      values.push(...admissionbatch);

      countQuery += `and s.exam_batch_id IN (${placeholders})`; // Add IN clause
      countValues.push(...admissionbatch);

    }
    if (admissionconfirmation && admissionconfirmation != "") {

      const placeholders = admissionconfirmation.map(() => '?').join(', '); // Create placeholders for query
      query += `and s.admission_confirmation_status_id IN (${placeholders})`; // Add IN clause
      values.push(...admissionconfirmation);

      countQuery += `and s.admission_confirmation_status_id IN (${placeholders})`; // Add IN clause
      countValues.push(...admissionconfirmation);


    }
    if (lastexammode && lastexammode != "") {

      const placeholders = lastexammode.map(() => '?').join(', '); // Create placeholders for query
      query += `and s.last_exam_mode IN (${placeholders})`; // Add IN clause
      values.push(...lastexammode);

      countQuery += `and s.last_exam_mode IN (${placeholders})`; // Add IN clause
      countValues.push(...lastexammode);

    }
    if (status && status != "") {
      const placeholders = status.map(() => '?').join(', '); // Create placeholders for query
      query += `and s.status IN (${placeholders})`; // Add IN clause
      values.push(...status);

      countQuery += `and s.status IN (${placeholders})`; // Add IN clause
      countValues.push(...status);


    }
    if (mode && mode != "") {
      const placeholders = mode.map(() => '?').join(', '); // Create placeholders for query
      query += `and s.mode IN (${placeholders})`; // Add IN clause
      values.push(...mode);

      countQuery += `and s.mode IN (${placeholders})`; // Add IN clause
      countValues.push(...mode);


    }
    if (admissiondate && admissiondate != "") {


      query += `and DATE(sps.created_at)=?`;
      values.push(admissiondate);

      countQuery += `and DATE(sps.created_at)=?`;
      countValues.push(admissiondate);
    }
    if (enrollment_number && enrollment_number != "") {
      query += `and trim(s.admission_no)=?`;
      values.push(enrollment_number.trim());

      countQuery += `and trim(s.admission_no)=?`;
      countValues.push(enrollment_number.trim());
    }
    if (counselor_name && counselor_name != "") {
      const placeholders = counselor_name.map(() => '?').join(', '); // Create placeholders for query
      query += `and u.full_name IN (${placeholders})`; // Add IN clause
      values.push(...counselor_name);

      countQuery += `and u.full_name IN (${placeholders})`; // Add IN clause
      countValues.push(...counselor_name);
    }
    if (phone_number && phone_number != "") {
      query += `and trim(s.phone)=? or trim(s.alternate_phone)=?`;
      values.push(phone_number.trim());
      values.push(phone_number.trim());

      countQuery += `and trim(s.phone)=? or trim(s.alternate_phone)=?`;
      countValues.push(phone_number.trim());
      countValues.push(phone_number.trim());
    }

    // if (alternate_phone && alternate_phone != "") {
    //   query += `and trim(s.alternate_phone)=?`;
    //   values.push(alternate_phone.trim());
    // }
    if (email && email != "") {
      query += `and trim(s.email)=? or trim(s.alternate_email)=?`;
      values.push(email.trim());
      values.push(email.trim());

      countQuery += `and trim(s.email)=? or trim(s.alternate_email)=?`;
      countValues.push(email.trim());
      countValues.push(email.trim());
    }
    if (session_to && session_to != "") {
      query += `and s.session_to=?`;
      values.push(session_to);

      countQuery += `and s.session_to=?`;
      countValues.push(session_to);
    }
    if (session_from && session_from != "") {
      query += `and s.session_from=?`;
      values.push(session_from);

      countQuery += `and s.session_from=?`;
      countValues.push(session_from);
    }
    if (alternate_email && alternate_email != "") {
      query += `and trim(s.alternate_email)=?`;
      values.push(alternate_email.trim());

      countQuery += `and trim(s.alternate_email)=?`;
      countValues.push(alternate_email.trim());

    }
    if (university && university != "") {
      const placeholders = university.map(() => '?').join(', '); // Create placeholders for query
      query += `and s.university_id IN (${placeholders})`; // Add IN clause
      values.push(...university);

      countQuery += `and s.university_id IN (${placeholders})`; // Add IN clause
      countValues.push(...university);

    }
    if (course && course != "") {
      const placeholders = course.map(() => '?').join(', '); // Create placeholders for query
      query += `and s.course_id IN (${placeholders})`; // Add IN clause
      values.push(...course);

      countQuery += `and s.course_id IN (${placeholders})`; // Add IN clause
      countValues.push(...course);

    }

    if (specialization && specialization != "") {
      const placeholders = specialization.map(() => '?').join(', '); // Create placeholders for query
      query += `and s.specialization_id IN (${placeholders})`; // Add IN clause
      values.push(...specialization);

      countQuery += `and s.specialization_id IN (${placeholders})`; // Add IN clause
      countValues.push(...specialization);

    }
    if (responsible_person && responsible_person != "") {
      const placeholders = responsible_person.map(() => '?').join(', '); // Create placeholders for query
      query += `and s.responsable_person_id IN (${placeholders})`; // Add IN clause
      values.push(...responsible_person);

      countQuery += `and s.responsable_person_id IN (${placeholders})`; // Add IN clause
      countValues.push(...responsible_person);


    }
    if (manager && manager != '') {

      const placeholders = manager.map(() => '?').join(', '); // Create placeholders for query
      query += `and m.id IN (${placeholders})`; // Add IN clause
      values.push(...manager);

      countQuery += `and m.id IN (${placeholders})`; // Add IN clause
      countValues.push(...manager);


    }
    if (follow_up && follow_up != '') {


      if (follow_up == "Current") {
        query += `and DATE(follow.follow_date)=?`;
        values.push(today);

        countQuery += `and DATE(follow.follow_date)=?`;
        countValues.push(today);
      }
      if (follow_up == "Pending") {
        query += `and DATE(follow.follow_date)> ?`;
        values.push(today);

        countQuery += `and DATE(follow.follow_date)> ?`;
        countValues.push(today);
      }
      if (follow_up == "Due") {
        query += `and DATE(follow.follow_date)< ?`;
        values.push(today);

        countQuery += `and DATE(follow.follow_date)< ?`;
        countValues.push(today);
      }

    }
    if (follow_up_custom_date && follow_up_custom_date != '') {
      query += `and DATE(follow.follow_date)=?`;
      values.push(follow_up_custom_date);

      countQuery += `and DATE(follow.follow_date)=?`;
      countValues.push(follow_up_custom_date);

    }
    if (payment1 && payment1 !== '' && payment2 && payment2 !== '') {
      query += ` AND DATE(sps.approved_at) BETWEEN ? AND ?`;
      values.push(payment1, payment2);

      countQuery += ` AND DATE(sps.approved_at) BETWEEN ? AND ?`;
      countValues.push(payment1, payment2);

    }
    if (limit && limit != '') {
      query += ` ORDER BY s.id DESC LIMIT ?  `;
      values.push(Number(limit));
    }
    if (page && page != '') {
      query += ` OFFSET ? `;
      values.push(Number(offset));
    }






    const totalResult = await new Promise((resolve, reject) => {
      db.query(countQuery, countValues, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    const total = totalResult[0]?.total || 0;

    const rows = await db.query(query, values);
    let data = [];

    for (let i = 0; i < rows.length; i++) {
      let a = `select sum(pay) as paidFee from imts_erp_student_payment where student_id=?`;
      let b = [rows[i].student_id];
      let c = await db.query(a, b);
      let paidFee = c[0].paidFee;
      let obj = {};


      if (rows[i].batch_change != null) {
        let a = `
        SELECT 
          t1.id,
          t1.title,
          SUM(COALESCE(t2.total_amount, 0) + COALESCE(t3.helping_charges, 0)) AS total_amount, 
          SUM(COALESCE(t3.helping_charges, 0)) AS assignmentFee
      FROM imts_erp_student_batch t1
      JOIN imts_erp_student_fee_structure t2 
          ON t2.student_batch_id = t1.id
      LEFT JOIN imts_erp_student_fee_immediate_charges t3 
          ON t3.student_batch_id = t1.id
      WHERE t1.student_id = ? and t1.id<=?;
      `;

        let b = [rows[i].student_id, rows[i].batch_change];
        let rows1 = await db.query(a, b); // Execute query
        const paymentResults = [];
        for (let row of rows1) {
          const assignmentFee = row.assignmentFee || 0;
          const totalFee = row.total_amount;

          let assignmentFeePaid = 0;
          let feePaidForThisRow = 0;


          if (paidFee > 0) {
            if (paidFee >= totalFee) {
              feePaidForThisRow = totalFee; // Full total fee is paid
              paidFee -= totalFee;
            } else {
              feePaidForThisRow = paidFee; // Partial payment for total fee
              paidFee = 0;
            }
          }

          if (paidFee > 0) {
            if (paidFee >= assignmentFee) {
              assignmentFeePaid = assignmentFee;
              paidFee -= assignmentFee;
            } else {
              assignmentFeePaid = paidFee;
              paidFee = 0;
            }
          }

          const remainingAssignmentFee = assignmentFee - assignmentFeePaid;
          const remainingFee = totalFee - feePaidForThisRow; // Remaining total fee (if partially paid)

          // paymentResults.push({
          //   batchId: row.id,
          //   totalFee,
          //   assignmentFee,
          //   assignmentFeePaid,
          //   remainingAssignmentFee,
          //   feePaidForThisRow,
          //   remainingFee,
          // });
          obj = {
            manager_name: rows[i].manager_name,
            student_id: rows[i].student_id,
            admission_no: rows[i].admission_no,
            counselor_name: rows[i].counselor_name || "",
            responsable_person: rows[i].responsable_person || "",
            student_name: rows[i].student_name || "",
            phone: rows[i].phone || "",
            user_id: rows[i].user_id || "",
            Email: rows[i].email || "",
            alternate_phone: rows[i].alternate_phone || "",
            alternate_email: rows[i].alternate_email || "",
            date_of_birth: rows[i].date_of_birth,
            university_name: rows[i].university_name || "",
            course_name: rows[i].course_name || "",
            specialization_name: rows[i].specialization_name || "",
            exam_mode: rows[i].exam_mode,
            admission_status: rows[i].admission_status || "",
            session_from: rows[i].session_from,
            session_to: rows[i].session_to,
            Eligible_Batch: row.title,
            Total_Course_Fee: totalFee,
            Total_Assignment_Fee: assignmentFee,
            Total_Payable_Assignment_Fee: remainingAssignmentFee,
            Total_Payable_Course_Fee: remainingFee,

          }
        }
      }
      else {
        let a = `
        SELECT 
          t1.id, 
          SUM(COALESCE(t2.total_amount, 0) + COALESCE(t3.helping_charges, 0)) AS total_amount, 
          SUM(COALESCE(t3.helping_charges, 0)) AS assignmentFee
      FROM imts_erp_student_batch t1
      JOIN imts_erp_student_fee_structure t2 
          ON t2.student_batch_id = t1.id
      LEFT JOIN imts_erp_student_fee_immediate_charges t3 
          ON t3.student_batch_id = t1.id
      WHERE t1.student_id = ?;
      `;

        let b = [rows[i].student_id];
        let rows1 = await db.query(a, b); // Execute query
        const paymentResults = [];
        for (let row of rows1) {
          const assignmentFee = row.assignmentFee || 0;
          const totalFee = row.total_amount;

          let assignmentFeePaid = 0;
          let feePaidForThisRow = 0;


          if (paidFee > 0) {
            if (paidFee >= totalFee) {
              feePaidForThisRow = totalFee; // Full total fee is paid
              paidFee -= totalFee;
            } else {
              feePaidForThisRow = paidFee; // Partial payment for total fee
              paidFee = 0;
            }
          }

          if (paidFee > 0) {
            if (paidFee >= assignmentFee) {
              assignmentFeePaid = assignmentFee;
              paidFee -= assignmentFee;
            } else {
              assignmentFeePaid = paidFee;
              paidFee = 0;
            }
          }

          const remainingAssignmentFee = assignmentFee - assignmentFeePaid;
          const remainingFee = totalFee - feePaidForThisRow; // Remaining total fee (if partially paid)

          // paymentResults.push({
          //   batchId: row.id,
          //   totalFee,
          //   assignmentFee,
          //   assignmentFeePaid,
          //   remainingAssignmentFee,
          //   feePaidForThisRow,
          //   remainingFee,
          // });
          obj = {
            manager_name: rows[i].manager_name,
            student_id: rows[i].student_id,
            admission_no: rows[i].admission_no,
            counselor_name: rows[i].counselor_name || "",
            responsable_person: rows[i].responsable_person || "",
            student_name: rows[i].student_name || "",
            phone: rows[i].phone || "",
            user_id: rows[i].user_id || "",
            Email: rows[i].email || "",
            alternate_phone: rows[i].alternate_phone || "",
            alternate_email: rows[i].alternate_email || "",
            date_of_birth: rows[i].date_of_birth,
            university_name: rows[i].university_name || "",
            course_name: rows[i].course_name || "",
            specialization_name: rows[i].specialization_name || "",
            exam_mode: rows[i].exam_mode,
            admission_status: rows[i].admission_status || "",
            session_from: rows[i].session_from,
            session_to: rows[i].session_to,
            Eligible_Batch: "",
            Total_Course_Fee: totalFee,
            Total_Assignment_Fee: assignmentFee,
            Total_Payable_Assignment_Fee: remainingAssignmentFee,
            Total_Payable_Course_Fee: remainingFee,

          }
        }
      }
      data.push(obj);





    }
    console.log(rows)








    res.status(200).json({
      data,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  }
  catch (Err) {
    console.log(Err);

  }
};
exports.getBatchList = async (req, res) => {
  const { Id,batchId } = req.body;
  
//   let a = `select t1.id, t1.weight,t1.title,t2.total_amount from imts_erp_student_batch t1 join imts_erp_student_fee_structure t2 on t2.student_batch_id =t1.id where t1.student_id=? and t1.id<=?`;
//   let b = [Id,batchId];

 let a = `select t1.id, t1.weight,t1.title,t2.total_amount from imts_erp_student_batch t1 join imts_erp_student_fee_structure t2 on t2.student_batch_id =t1.id where t1.student_id=?`;
  let b = [Id];
  
  let c = await db.query(a, b);
  res.send(c);

}

exports.getElligibleBatchById = async (req, res) => {
  const { Id, batchId } = req.body;
  console.log(req.body);
  let data = [];
  try {
    let a = `select sum(total_amount) as total_amount from imts_erp_student_fee_structure where student_id=? and student_batch_id<=?`;

    let b = [Id, batchId];
    let c = await db.query(a, b);

    let totalamount = c.length > 0 ? c[0].total_amount : 0;

    let x = `select sum(helping_charges) as helping_charges from imts_erp_student_fee_immediate_charges where student_id=? and student_batch_id<=?`;
    let y = [Id, batchId];
    let z = await db.query(x, y);
    let assignmentfee = z.length > 0 ? z[0].helping_charges : 0;


    let obj = {

      batchId: batchId,
      assignmentfees: assignmentfee,
      amount: totalamount + assignmentfee
    }
    data.push(obj);
    console.log(data);

  return  res.json(data)
  }
  catch (err) {
    console.error(err);
    res.send("Error")
  }



}

exports.getStudents = async (req, res) => {
  console.log(req.body);

  const { full_name,
    enrollment_number,
    counselor_name,
    phone_number,
    alternate_phone,
    email,
    session_to,
    session_from,
    alternate_email,
    university,
    course,
    specialization,
    responsible_person,
    manager,
    follow_up,
    follow_up_custom_date,
    payment1,
    payment2,
    exammode,
    admissionconfirmation,
    admissiondate,
    admissionbatch,
    lastexammode,
    status,
    mode
  } = req.body;
  const { page = 1, limit = 10 } = req.body;
  const offset = (page - 1) * limit;

  console.log(req.body);
  console.log(follow_up_custom_date);

  const today = moment().format('YYYY-MM-DD');
  let countQuery = `
  SELECT COUNT(*) as total 
        FROM imts_erp_student s 
 LEFT JOIN imts_erp_admission_confirmation_status a on a.id=s.admission_confirmation_status_id 
 LEFT JOIN imts_erp_student_assigned_follow_pdc follow on follow.student_id=s.id 
LEFT JOIN imts_erp_user u ON u.id = s.created_by
LEFT JOIN imts_erp_student_personal sp ON s.id = sp.student_id
LEFT JOIN imts_erp_university univ ON s.university_id = univ.id
LEFT JOIN imts_erp_course c ON s.course_id = c.id
LEFT JOIN imts_erp_specialization spec ON s.specialization_id = spec.id
LEFT JOIN imts_erp_counsellor rp ON rp.id = s.responsable_person_id
LEFT JOIN imts_erp_manager m ON m.id = rp.manager_id
     
    `;

  let query = `
  SELECT 
   
    s.id as student_id,
    COALESCE(u.full_name, '') as counselor_name,
    s.name as student_name,
    s.phone,
    s.email,
    s.user_id,
    s.batch_changing,
    s.admission_no,
    rp.full_name as responsable_person,
    s.alternate_email,
    DATE_FORMAT(sp.date_of_birth, '%d %b %Y') as date_of_birth,
    s.alternate_phone,
    univ.name as university_name,
    c.name as course_name,
    spec.name as specialization_name,
    m.full_name as manager_name,
  (
    case s.exam_mode
    when 1 then 'Annual'
    when 2 then 'Semester'
    end
) as exam_mode,
    s.session_from,
    s.session_to,
    s.status,
    s.batch_change,
    s.last_exam_mode,
    s.last_exam_given,
    s.last_exam_date,
    s.last_exam_fees,
    acs.name as admission_status,
   
    COALESCE((
        SELECT SUM(total_amount) 
        FROM imts_erp_student_fee_structure 
        WHERE student_id = s.id
    ), 0) as total_fees,
    COALESCE((
        SELECT SUM(pay) 
        FROM imts_erp_student_payment 
        WHERE student_id = s.id and status='2'
    ), 0) as total_paid,
    
    COALESCE((
        SELECT SUM(total_amount) 
        FROM imts_erp_student_fee_structure 
        WHERE student_id = s.id
    ), 0) - COALESCE((
        SELECT SUM(pay) 
        FROM imts_erp_student_payment 
        WHERE student_id = s.id and status='2'
    ), 0) as pending_amount
FROM imts_erp_student as s

LEFT JOIN  imts_erp_admission_confirmation_status acs ON s.admission_confirmation_status_id = acs.id
LEFT JOIN imts_erp_student_assigned_follow_pdc sf on sf.student_id=s.id
LEFT JOIN imts_erp_user u ON u.id = s.created_by
LEFT JOIN imts_erp_student_personal sp ON s.id = sp.student_id
LEFT JOIN imts_erp_university univ ON s.university_id = univ.id
LEFT JOIN imts_erp_course c ON s.course_id = c.id
LEFT JOIN imts_erp_specialization spec ON s.specialization_id = spec.id
LEFT JOIN imts_erp_counsellor rp ON rp.id = s.responsable_person_id
LEFT JOIN imts_erp_manager m ON m.id = rp.manager_id
 `;
  //
  // and (acs.name = 'RECEIVED' OR acs.name = 'SENT')
  let values = [];
  let countValues = [];
  try {
    if ((follow_up && follow_up != "") || (follow_up_custom_date && follow_up_custom_date != "")) {
      query += `
      LEFT JOIN imts_erp_student_followup follow ON follow.student_id = s.id
      `;
      countQuery += `
      LEFT JOIN imts_erp_student_followup follow ON follow.student_id = s.id
      
      `;
    }
    if ((payment1 && payment1 != "") || (payment2 && payment2 != "") || (admissiondate && admissiondate != "")) {
      query += `
      LEFT JOIN imts_erp_student_payment sps ON sps.student_id = s.id
      `;
      countQuery+=`
      LEFT JOIN imts_erp_student_payment sps ON sps.student_id = s.id
     
      `;
    }

  //   query += `
  // WHERE ( acs.name='RECEIVED' OR acs.name='SENT') and sf.follow_status='3'
  // `;
  // countQuery+=`
  // WHERE ( a.name='RECEIVED' OR a.name='SENT') and follow.follow_status='3'
  // `
    if (full_name && full_name != "") {
      query += `and trim(s.name)=?`;
      values.push(full_name.trim());

      countQuery+=`and trim(s.name)=?`;
      countValues.push(full_name.trim());

    }
    if (exammode && exammode != "") {
      const placeholders = exammode.map(() => '?').join(', '); // Create placeholders for query
      query += `and s.exam_mode IN (${placeholders})`; // Add IN clause
      values.push(...exammode);

      countValues += `and s.exam_mode IN (${placeholders})`; // Add IN clause
      countQuery.push(...exammode);

    }
    if (admissionbatch && admissionbatch != "") {
      const placeholders = admissionbatch.map(() => '?').join(', '); // Create placeholders for query
      query += `and s.exam_batch_id IN (${placeholders})`; // Add IN clause
      values.push(...admissionbatch);
      
      countQuery += `and s.exam_batch_id IN (${placeholders})`; // Add IN clause
      countValues.push(...admissionbatch);

    }
    if (admissionconfirmation && admissionconfirmation != "") {

      const placeholders = admissionconfirmation.map(() => '?').join(', '); // Create placeholders for query
      query += `and s.admission_confirmation_status_id IN (${placeholders})`; // Add IN clause
      values.push(...admissionconfirmation);

      countQuery += `and s.admission_confirmation_status_id IN (${placeholders})`; // Add IN clause
      countValues.push(...admissionconfirmation);
      

    }
    if (lastexammode && lastexammode != "") {

      const placeholders = lastexammode.map(() => '?').join(', '); // Create placeholders for query
      query += `and s.last_exam_mode IN (${placeholders})`; // Add IN clause
      values.push(...lastexammode);

      countQuery += `and s.last_exam_mode IN (${placeholders})`; // Add IN clause
      countValues.push(...lastexammode);

    }
    if (status && status != "") {
      const placeholders = status.map(() => '?').join(', '); // Create placeholders for query
      query += `and s.status IN (${placeholders})`; // Add IN clause
      values.push(...status);

      countQuery += `and s.status IN (${placeholders})`; // Add IN clause
      countValues.push(...status);


    }
    if (mode && mode != "") {
      const placeholders = mode.map(() => '?').join(', '); // Create placeholders for query
      query += `and s.mode IN (${placeholders})`; // Add IN clause
      values.push(...mode);

      countQuery += `and s.mode IN (${placeholders})`; // Add IN clause
      countValues.push(...mode);


    }
    if (admissiondate && admissiondate != "") {
      console.log("This is date");
      console.log(admissiondate);

      query += `and DATE(sps.created_at)=?`;
      values.push(admissiondate);

      countQuery += `and DATE(sps.created_at)=?`;
      countValues.push(admissiondate);
    }
    if (enrollment_number && enrollment_number != "") {
      query += `and trim(s.admission_no)=?`;
      values.push(enrollment_number.trim());

      countQuery += `and trim(s.admission_no)=?`;
      countValues.push(enrollment_number.trim());
    }
    if (counselor_name && counselor_name != "") {
      const placeholders = counselor_name.map(() => '?').join(', '); // Create placeholders for query
      query += `and u.full_name IN (${placeholders})`; // Add IN clause
      values.push(...counselor_name);

      countQuery += `and u.full_name IN (${placeholders})`; // Add IN clause
      countValues.push(...counselor_name);
    }
    if (phone_number && phone_number != "") {
      query += `and trim(s.phone)=? or trim(s.alternate_phone)=?`;
      values.push(phone_number.trim());
      values.push(phone_number.trim());

      countQuery += `and trim(s.phone)=? or trim(s.alternate_phone)=?`;
      countValues.push(phone_number.trim());
      countValues.push(phone_number.trim());
    }

    // if (alternate_phone && alternate_phone != "") {
    //   query += `and trim(s.alternate_phone)=?`;
    //   values.push(alternate_phone.trim());
    // }
    if (email && email != "") {
      query += `and trim(s.email)=? or trim(s.alternate_email)=?`;
      values.push(email.trim());
      values.push(email.trim());

      countQuery += `and trim(s.email)=? or trim(s.alternate_email)=?`;
      countValues.push(email.trim());
      countValues.push(email.trim());
    }
    if (session_to && session_to != "") {
      query += `and s.session_to=?`;
      values.push(session_to);

      countQuery += `and s.session_to=?`;
      countValues.push(session_to);
    }
    if (session_from && session_from != "") {
      query += `and s.session_from=?`;
      values.push(session_from);

      countQuery += `and s.session_from=?`;
      countValues.push(session_from);
    }
    if (alternate_email && alternate_email != "") {
      query += `and trim(s.alternate_email)=?`;
      values.push(alternate_email.trim());

      countQuery += `and trim(s.alternate_email)=?`;
      countValues.push(alternate_email.trim());

    }
    if (university && university != "") {
      const placeholders = university.map(() => '?').join(', '); // Create placeholders for query
      query += `and s.university_id IN (${placeholders})`; // Add IN clause
      values.push(...university);

      countQuery += `and s.university_id IN (${placeholders})`; // Add IN clause
      countValues.push(...university);

    }
    if (course && course != "") {
      const placeholders = course.map(() => '?').join(', '); // Create placeholders for query
      query += `and s.course_id IN (${placeholders})`; // Add IN clause
      values.push(...course);

      countQuery += `and s.course_id IN (${placeholders})`; // Add IN clause
      countValues.push(...course);

    }

    if (specialization && specialization != "") {
      const placeholders = specialization.map(() => '?').join(', '); // Create placeholders for query
      query += `and s.specialization_id IN (${placeholders})`; // Add IN clause
      values.push(...specialization);

      countQuery += `and s.specialization_id IN (${placeholders})`; // Add IN clause
      countValues.push(...specialization);

    }
    if (responsible_person && responsible_person != "") {
      const placeholders = responsible_person.map(() => '?').join(', '); // Create placeholders for query
      query += `and s.responsable_person_id IN (${placeholders})`; // Add IN clause
      values.push(...responsible_person);

      countQuery += `and s.responsable_person_id IN (${placeholders})`; // Add IN clause
      countValues.push(...responsible_person);


    }
    if (manager && manager != '') {

      const placeholders = manager.map(() => '?').join(', '); // Create placeholders for query
      query += `and m.id IN (${placeholders})`; // Add IN clause
      values.push(...manager);

      countQuery += `and m.id IN (${placeholders})`; // Add IN clause
      countValues.push(...manager);


    }
    if (follow_up && follow_up != '') {


      if (follow_up == "Current") {
        query += `and DATE(follow.follow_date)=?`;
        values.push(today);

        countQuery += `and DATE(follow.follow_date)=?`;
        countValues.push(today);
      }
      if (follow_up == "Pending") {
        query += `and DATE(follow.follow_date)> ?`;
        values.push(today);

        countQuery += `and DATE(follow.follow_date)> ?`;
        countValues.push(today);
      }
      if (follow_up == "Due") {
        query += `and DATE(follow.follow_date)< ?`;
        values.push(today);

        countQuery += `and DATE(follow.follow_date)< ?`;
        countValues.push(today);
      }

    }
    if (follow_up_custom_date && follow_up_custom_date != '') {
      query += `and DATE(follow.follow_date)=?`;
      values.push(follow_up_custom_date);

      countQuery += `and DATE(follow.follow_date)=?`;
      countValues.push(follow_up_custom_date);

    }
    if (payment1 && payment1 !== '' && payment2 && payment2 !== '') {
      query += ` AND DATE(sps.approved_at) BETWEEN ? AND ?`;
      values.push(payment1, payment2);
   
      countQuery += ` AND DATE(sps.approved_at) BETWEEN ? AND ?`;
      countValues.push(payment1, payment2);
   
    }
    if (limit && limit != '') {
      query += ` ORDER BY s.id DESC LIMIT ?  `;
      values.push(Number(limit));
    }
    if (page && page != '') {
      query += ` OFFSET ? `;
      values.push(Number(offset));
    }




   

    const totalResult = await new Promise((resolve, reject) => {
      db.query(countQuery,countValues, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    let total = totalResult[0]?.total || 0;

    total=total+3;
    const rows =await  db.query(query, values);




    const data = rows.map((row) => ({
      manager_name: row.manager_name,
      student_id: row.student_id,
      admission_no: row.admission_no,
      counselor_name: row.counselor_name || "",
      responsable_person: row.responsable_person || "",
      student_name: row.student_name || "",
      phone: row.phone || "",
      user_id: row.user_id || "",
      Email: row.email || "",
      alternate_phone: row.alternate_phone || "",
      alternate_email: row.alternate_email || "",
      date_of_birth: row.date_of_birth,
      university_name: row.university_name || "",
      course_name: row.course_name || "",
      specialization_name: row.specialization_name || "",
      exam_mode: row.exam_mode,
      admission_status: row.admission_status || "",
      session_from: row.session_from,
      session_to: row.session_to,
      total_fees: row.total_fees || 0,
      total_paid: row.total_paid || 0,
      pending_amount: row.pending_amount || 0,
    }));



    res.status(200).json({
      data,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  }
  catch (Err) {
    console.log(Err);

  }
};



// exports.getStudents = async (req, res) => {


//   const { full_name,
//     enrollment_number,
//     counselor_name,
//     phone_number,
//     alternate_phone,
//     email,
//     session_to,
//     session_from,
//     alternate_email,
//     university,
//     course,
//     specialization,
//     responsible_person,
//     manager,
//     follow_up,
//     follow_up_custom_date,
//     payment1,
//     payment2,
//     exammode,
//     admissionconfirmation,
//     admissiondate,
//     admissionbatch,
//     lastexammode,
//     status,
//     mode
//   } = req.body;
//   const { page = 1, limit = 10 } = req.body;
//   const offset = (page - 1) * limit;

//   console.log(req.body);



//   const today = moment().format('YYYY-MM-DD');





//   try {


//     let counselorString = (counselor_name && counselor_name.length > 0) ? ConvertArrayToString(counselor_name) : null;
//     let universityString = (university && university.length > 0) ? ConvertArrayToString(university) : null;
//     let courseString = (course && course.length > 0) ? ConvertArrayToString(course) : null;
//     let specializationString = (specialization && specialization.length > 0) ? ConvertArrayToString(specialization) : null;
//     let responsibleString = (responsible_person && responsible_person.length > 0) ? ConvertArrayToString(responsible_person) : null;
//     let managerString = (manager && manager.length > 0) ? ConvertArrayToString(manager) : null;
//     let examModeString = (exammode && exammode.length > 0) ? ConvertArrayToString(exammode) : null;
//     let admissionConfirmationString = (admissionconfirmation && admissionconfirmation.length > 0) ? ConvertArrayToString(admissionconfirmation) : null;
//     let admissionBatchString = (admissionbatch && admissionbatch.length > 0) ? ConvertArrayToString(admissionbatch) : null;
//     let lastExamModeString = (lastexammode && lastexammode.length > 0) ? ConvertArrayToString(lastexammode) : null;
//     let statusString = (status && status.length > 0) ? ConvertArrayToString(status) : null;
//     let modeString = (mode && mode.length > 0) ? ConvertArrayToString(mode) : null;

//     let a = `CALL getTotalStudents(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`
//     let b = [
//       full_name || null,
//       enrollment_number || null,
//       counselorString != null ? counselorString : null,
//       phone_number || null,
//       alternate_phone || null,
//       email || null,
//       session_to || null,
//       session_from || null,
//       alternate_email || null,
//       universityString != null ? universityString : null,
//       courseString != null ? courseString : null,
//       specializationString != null ? specializationString : null,
//       responsibleString != null ? responsibleString : null,
//       managerString != null ? managerString : null,
//       follow_up || null,
//       follow_up_custom_date || null,
//       payment1 || null,
//       payment2 || null,
//       examModeString != null ? examModeString : null,
//       admissionConfirmationString != null ? admissionConfirmationString : null,
//       admissiondate || null,
//       admissionBatchString != null ? admissionBatchString : null,
//       lastExamModeString != null ? lastExamModeString : null,
//       statusString != null ? statusString : null,
//       modeString != null ? modeString : null

//     ]
//     console.log(b.length);

//     let totalResult = (await db.query(a, b)).flat();

//     const total = totalResult[0]?.total || 0;

//     let query = `CALL getStudents(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;

//     let values = [
//       full_name || null,
//       enrollment_number || null,
//       counselorString != null ? counselorString : null,
//       phone_number || null,
//       alternate_phone || null,
//       email || null,
//       session_to || null,
//       session_from || null,
//       alternate_email || null,
//       universityString != null ? universityString : null,

//       courseString != null ? courseString : null,
//       specializationString != null ? specializationString : null,
//       responsibleString != null ? responsibleString : null,

//       managerString != null ? managerString : null,
//       follow_up || null,
//       follow_up_custom_date || null,
//       payment1 || null,
//       payment2 || null,
//       examModeString != null ? examModeString : null,
//       admissionConfirmationString != null ? admissionConfirmationString : null,
//       admissiondate || null,
//       admissionBatchString != null ? admissionBatchString : null,

//       lastExamModeString != null ? lastExamModeString : null,

//       statusString != null ? statusString : null,
//       offset || 0,
//       limit || 10,
//       modeString != null ? modeString : null

//     ];

//     if (values.length !== 27) {
//       throw new Error('Values array length does not match the number of placeholders');
//     }


//     const rows = (await db.query(query, values)).flat();


//     const data = rows.map((row) => ({
//       manager_name: row.manager_name,
//       student_id: row.student_id,
//       admission_no: row.admission_no,
//       counselor_name: row.counselor_name || "",
//       responsable_person: row.responsable_person || "",
//       student_name: row.student_name || "",
//       phone: row.phone || "",
//       user_id: row.user_id || "",
//       Email: row.email || "",
//       alternate_phone: row.alternate_phone || "",
//       alternate_email: row.alternate_email || "",
//       date_of_birth: row.date_of_birth,
//       university_name: row.university_name || "",
//       course_name: row.course_name || "",
//       specialization_name: row.specialization_name || "",
//       exam_mode: row.exam_mode,
//       admission_status: row.admission_status || "",
//       session_from: row.session_from,
//       session_to: row.session_to,
//       total_fees: row.total_fees || 0,
//       total_paid: row.total_paid || 0,
//       pending_amount: row.pending_amount || 0,
//     }));



//     return res.status(200).json({
//       data,
//       pagination: {
//         page: Number(page),
//         limit: Number(limit),
//         total,
//         totalPages: Math.ceil(total / limit),
//       },
//     });
//   }
//   catch (Err) {
//     console.log(Err.message);


//   }
// };


exports.dataRefresh = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 1000;
  const offset = (page - 1) * limit;

  const query = `
        SELECT 
            s.id as student_id,
            COALESCE(u.full_name, '') as counselor_name,
            s.name as student_name,
            s.user_id,
            s.phone,
            s.email,
            s.alternate_phone,
            s.alternate_email,
            sp.date_of_birth,
            univ.name as university_name,
            c.name as course_name,
            spec.name as specialization_name,
            s.exam_mode,
            acs.name as admission_status,
            sb.title as batch_title,
            s.session_from,
            s.session_to,
            s.enrollment_no,
            sfs.registration_fees as assignment_fees,
            sfs.total_amount,
            s.status,
            s.batch_change,
            s.last_exam_mode,
            s.last_exam_given,
            s.last_exam_date,
            s.last_exam_fees,
            (sfs.total_amount - COALESCE(sfs.installment_amount, 0)) as balance,
            COALESCE(sb.weight, 0) as batch_change,
            ses.remark as last_exam_remark
        FROM imts_erp_student s
        LEFT JOIN imts_erp_user u ON s.created_by = u.id
        LEFT JOIN imts_erp_student_personal sp ON s.id = sp.student_id
        LEFT JOIN imts_erp_university univ ON s.university_id = univ.id
        LEFT JOIN imts_erp_course c ON s.course_id = c.id
        LEFT JOIN imts_erp_specialization spec ON s.specialization_id = spec.id
        LEFT JOIN imts_erp_admission_confirmation_status acs ON s.admission_confirmation_status_id = acs.id
        LEFT JOIN imts_erp_student_batch sb ON s.id = sb.student_id
        LEFT JOIN imts_erp_student_exam_sitting ses ON s.id = ses.student_id
        LEFT JOIN imts_erp_student_fee_structure sfs ON s.id = sfs.student_id
        WHERE s.deleted_at IS NULL
        ORDER BY s.id DESC
        LIMIT ? OFFSET ?
    `;

  try {
    const rows = await new Promise((resolve, reject) => {
      db.query(query, [limit, offset], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });

    res.status(200).json({
      data: rows,
      pagination: {
        page,
        limit,
        totalRecords: rows.length,
      },
    });
  } catch (error) {
    console.error("Error in dataRefresh:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch data", error: error.message });
  }
};

exports.updateStudentById = async (req, res) => {
  const { student_id } = req.params;
  const {
    status,
    batch_change,

    mode,
    last_exam_mode,
    batch_changing,
    last_exam_given,
    last_exam_date,
    last_exam_fees,
    detail, // detail should be an object
  } = req.body;
  console.log("This is Updates")

  console.log(req.body);

  // Validate and parse the student_id parameter
  const parsedStudentId = Number(student_id);
  if (isNaN(parsedStudentId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid student ID",
    });
  }

  try {
    const studentQuery = `
        SELECT * 
        FROM imts_erp_student
        WHERE id = ? AND deleted_at IS NULL
      `;
    const student = await new Promise((resolve, reject) => {
      db.query(studentQuery, [parsedStudentId], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found for the given ID",
      });
    }

    const updateQuery = `
        UPDATE imts_erp_student
        SET 
          status = ?, 
          batch_changing=?,
          mode=?,
          batch_change = ?, 
          last_exam_mode = ?, 
          last_exam_given = ?, 
          last_exam_date = ?, 
          last_exam_fees = ?,
          moredetail = ?
        WHERE id = ? AND deleted_at IS NULL
      `;

    const updateResult = await new Promise((resolve, reject) => {
      db.query(
        updateQuery,
        [
          status,
          batch_changing,
          mode,
          batch_change,
          last_exam_mode,
          last_exam_given,
          last_exam_date,
          last_exam_fees,
          JSON.stringify(detail), // Stringify the JSON object
          parsedStudentId,
        ],
        (err, result) => {
          if (err) reject(err);
          else resolve(result.affectedRows > 0);
        }
      );
    });

    if (updateResult) {
      return res.status(200).json({
        success: true,
        message: "Student record updated successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to update student record",
      });
    }
  } catch (error) {
    console.error("Error updating student:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


exports.getStudentById = async (req, res) => {
  const { id } = req.params;


  const studentId = Number(id);
  if (isNaN(studentId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid student ID",
    });
  }

  try {

    // sfs.registration_fees as assignment_fees,

    const query = `
      SELECT 
         s.id as student_id,
         COALESCE(u.full_name, '') as counselor_name,
         s.name as student_name,
         s.user_id,
         s.mode,
         s.phone,
  DATE_FORMAT((select created_at from imts_erp_student_payment where student_id=s.id limit 1),'%e %b %Y')  AS  admission_date,
     
        
         s.batch_changing,
         s.email,
         s.alternate_phone,
         s.alternate_email,
         s.admission_no,
       DATE_FORMAT(sp.date_of_birth, '%e %b %Y') AS date_of_birth,
         univ.name as university_name,
         c.name as course_name,
         spec.name as specialization_name,
        (
    case s.exam_mode
    when 1 then 'Annual'
    when 2 then 'Semester'
    end
) as exam_mode,
         (select name from imts_erp_exam_batch where id=s.exam_batch_id) as admission_batch,
         acs.name as admission_status,
      
         s.session_from,
         s.session_to,
         s.enrollment_no,

       
        
          s.status,
          s.batch_change,
          s.last_exam_mode,
          s.last_exam_given,
          s.last_exam_date,
          s.last_exam_fees,
          s.moredetail,
          sp.uid as paymenturl,
       
			
			scc.helping_charges as assignment_fees,
      
         ses.remark as last_exam_remark
      FROM imts_erp_student s
      LEFT JOIN imts_erp_user u ON s.created_by = u.id
      LEFT JOIN imts_erp_student_personal sp ON s.id = sp.student_id
      LEFT JOIN imts_erp_university univ ON s.university_id = univ.id
      LEFT JOIN imts_erp_course c ON s.course_id = c.id
      LEFT JOIN imts_erp_specialization spec ON s.specialization_id = spec.id
      LEFT JOIN imts_erp_admission_confirmation_status acs ON s.admission_confirmation_status_id = acs.id
      
      LEFT JOIN imts_erp_student_exam_sitting ses ON s.id = ses.student_id
     
      LEFT JOIN imts_erp_student_fee_immediate_charges scc  ON s.id = scc.student_id
      
      WHERE s.id = ? AND s.deleted_at IS NULL
      ORDER BY s.id DESC;
    `;


    const queryAsync = util.promisify(db.query).bind(db);
    const student = await queryAsync(query, [studentId]);

    if (!student || student.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found for the given ID",
      });
    }

    return res.status(200).json({
      success: true,
      data: student[0],
    });
  } catch (error) {
    console.error("Error fetching student by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.bulkUpdateStudent = async (req, res) => {
  const allowedFields = [
    "status",
    "batch_change",
    "last_exam_mode",
    "last_exam_given",
    "last_exam_date",
    "last_exam_fees",
  ];

  try {
    const students = req.body.students;

    if (!Array.isArray(students) || students.length === 0) {
      return res
        .status(400)
        .json({ error: "No students provided for bulk update" });
    }

    const updateQueries = [];

    students.forEach((student) => {
      const { student_id, fieldsToUpdate } = student;
      const updates = [];
      const values = [];

      for (const [key, value] of Object.entries(fieldsToUpdate)) {
        if (allowedFields.includes(key)) {
          updates.push(`${key} = ?`);
          values.push(value);
        }
      }

      if (updates.length > 0) {
        const query = `
            UPDATE imts_erp_student
            SET ${updates.join(", ")}
            WHERE id = ?
          `;
        updateQueries.push({ query, values: [...values, student_id] });
      }
    });

    if (updateQueries.length === 0) {
      return res
        .status(400)
        .json({ error: "No valid fields provided for bulk update" });
    }

    await db.query("START TRANSACTION");

    for (let { query, values } of updateQueries) {
      await db.query(query, values);
    }

    await db.query("COMMIT");

    return res.status(200).json({ message: "Bulk update successful" });
  } catch (error) {
    await db.query("ROLLBACK");
    console.error("Bulk update transaction failed:", error.message);

    return res.status(500).json({
      error: "Failed to update students",
      details: error.message,
    });
  }
};

exports.bulkAssignManager = async (req, res) => {
  const { assignBulk } = req.body;

  if (!Array.isArray(assignBulk) || assignBulk.length === 0) {
    return res
      .status(400)
      .json({ error: "Please provide a valid array of bulk assignments." });
  }

  const results = [];

  try {
    for (const { manager_id, student_names } of assignBulk) {
      if (
        !manager_id ||
        !Array.isArray(student_names) ||
        student_names.length === 0
      ) {
        return res.status(400).json({
          error: "Invalid data: manager_id or student_names missing.",
        });
      }

      const [managerResults] = await db.query(
        "SELECT assign_bulk FROM imts_erp_user WHERE id = ?",
        [manager_id]
      );

      console.log("Manager Results:", managerResults);

      if (!managerResults || managerResults.length === 0) {
        throw new Error(`Manager with ID ${manager_id} not found.`);
      }

      let currentAssignBulk = [];
      try {
        currentAssignBulk = managerResults.assign_bulk
          ? JSON.parse(managerResults.assign_bulk)
          : [];
      } catch (parseError) {
        console.error("Error parsing assign_bulk:", parseError.message);
      }

      console.log("Current Assign Bulk:", currentAssignBulk);
      console.log("New Student Names:", student_names);

      // Merge currentAssignBulk with student_names using a Set to avoid duplicates
      const updatedAssignBulk = Array.from(new Set([...currentAssignBulk, ...student_names]));

      console.log("Updated Assign Bulk:", updatedAssignBulk);

      await db.query("UPDATE imts_erp_user SET assign_bulk = ? WHERE id = ?", [
        JSON.stringify(updatedAssignBulk),
        manager_id,
      ]);

      results.push({
        manager_id,
        updated_assign_bulk: updatedAssignBulk,
        message: `Successfully updated assign_bulk for manager ${manager_id}`,
      });
    }

    res.status(200).json({
      message: "Successfully updated assign_bulk for all managers.",
      results,
    });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getBulkAssignManagerById = async (req, res) => {
  const { manager_id } = req.params;

  if (!manager_id) {
    return res.status(400).json({ error: "Manager ID is required." });
  }

  try {
    console.log("1. Fetching data for manager_id:", manager_id);

    // Fetch the assign_bulk field for the given manager_id
    const [managerResults] = await db.query(
      "SELECT assign_bulk FROM imts_erp_user WHERE id = ?",
      [manager_id]
    );

    console.log("2. Manager Results:", managerResults);

    if (!managerResults || managerResults.length === 0) {
      console.log("3. No manager found or assign_bulk is missing");
      return res.status(404).json({
        error: `Manager with ID ${manager_id} not found or assign_bulk is missing.`,
      });
    }

    const rawAssignBulk = managerResults.assign_bulk;
    console.log("4. Raw Assign Bulk:", rawAssignBulk);

    // Parse the JSON string to get an array of student IDs
    let studentIds;
    try {
      studentIds = JSON.parse(rawAssignBulk);
    } catch (err) {
      console.error("Error parsing assign_bulk:", err);
      return res.status(400).json({
        error: `Invalid assign_bulk format for manager ID ${manager_id}`,
      });
    }
    console.log("5. Parsed Student IDs:", studentIds);

    if (!Array.isArray(studentIds) || studentIds.length === 0) {
      console.log("6. No students assigned");
      return res.status(200).json({
        message: `No students assigned to manager ID ${manager_id}`,
        manager_id,
        students: [],
      });
    }

    // Query to fetch student details using the IN clause
    const query = `
      SELECT 
        s.id as student_id,
        s.name as student_name,
        s.email,
        s.phone
      FROM imts_erp_student s
      WHERE s.id IN (?) AND s.deleted_at IS NULL;
    `;
    console.log("7. Executing query with student IDs:", studentIds);

    // Execute the query using Promise.all
    const queryAsync = util.promisify(db.query).bind(db);
    const studentDetails = await Promise.all(studentIds.map(async (studentId) => {
      const [student] = await queryAsync(query, [studentId]);
      console.log("8. Student Details:", student);
      return student;
    }));

    console.log("9. All Student Details:", studentDetails);

    if (!studentDetails || studentDetails.length === 0) {
      console.log("10. No student details found");
      return res.status(200).json({
        message: `No student details found for the given IDs`,
        manager_id,
        students: [],
      });
    }

    return res.status(200).json({
      message: `Successfully fetched details for ${studentDetails.length} students`,
      manager_id,
      total_students: studentDetails.length,
      students: studentDetails,
    });
  } catch (err) {
    console.error("Error fetching assign_bulk by ID:", err.message);
    return res.status(500).json({
      error: "Internal server error. Please try again later.",
    });
  }
};
exports.assignCounsellorToStudent = async (req, res) => {
  console.log(req.body);
  const { counsellor, manager } = req.body;

  for (let i = 0; i < counsellor.length; i++) {
    let a = `update imts_erp_student set 	responsable_person_id=? where id=?`;
    let b = [manager, counsellor[i]];
    let c = await db.query(a, b);
  }
  return res.send("Responsable Person Successfully Assign to Student");

}


exports.getStudentFeeWithBatch = async (req, res) => {
  console.log(req.body);

  const {
    batch_change,
    session_from,
    session_to,
    exam_batch
  } = req.body;

  let a = `select t1.title,t1.id,t2.total_amount from imts_erp_student_batch t1 join imts_erp_student_fee_structure t2 on t2.student_batch_id=t1.id 
  where t1.exam_batch_id=? and t1.session_from=? and t1.session_to=? and t1.weight=?
  `;
  let b = [exam_batch,session_from,session_to,batch_change];
  let c=await db.query(a,b);
  console.log(c);
  
  if(c.length>0)
  {
    return res.send(`The Fee For ${c[0].title} is ${c[0].total_amount}`);
  }
  else
  {
    return res.send(`Record does not found`);
  }

}

exports.getTotalPaid = async (req, res) => {
  const { Id } = req.body;
  const payments = await db.query(
    "SELECT SUM(pay) AS totalPaid FROM imts_erp_student_payment WHERE student_id = ? and status='2'",
    [Id]
  );
  res.send(payments);
  

}


exports.getElligibleBatch = async (req, res) => {
  const { Id } = req.body;
  try {
    let a = `select t1.id, t1.title, t2.total_amount, t3.name, t3.month_number 
         from imts_erp_student_batch t1 
         join imts_erp_student_fee_structure t2 on t2.student_batch_id = t1.id 
         join imts_erp_exam_batch t3 on t3.id = t1.exam_batch_id 
         where t1.student_id=?`;
    let b = [Id];
    let c = await db.query(a, b);

    const today = moment().format('YYYY-MM-DD');
    const currentMonth = parseInt(moment().format('MM'), 10);
    const currentYear = parseInt(moment().format('YYYY'), 10);

    let data = [];
    let num = 0;
    let amount = 0;
    let title = "";
    let batchId = "";

    for (let i = 0; i < c.length; i++) {
      // Extract batch year and month
      const batchYear = parseInt(c[i].title.match(/\d{4}/), 10);
      const batchStartMonth = parseInt(c[i].month_number, 10);

      // Calculate batch end month and year
      const batchEndMonth = (batchStartMonth + 5) % 12 || 12;
      const batchEndYear = batchStartMonth + 5 > 12 ? batchYear + 1 : batchYear;

      if (batchYear > currentYear || (batchYear === currentYear && batchStartMonth > currentMonth)) {
        // Future batch
        num = i;
        batchId = c[i].id;
        title = c[i].title;
        break;
      } else if (
        (currentYear > batchYear || (currentYear === batchYear && currentMonth >= batchStartMonth)) &&
        (currentYear < batchEndYear || (currentYear === batchEndYear && currentMonth <= batchEndMonth))
      ) {
        // Current batch
        batchId = c[i].id;
        num = i;
        title = c[i].title;
        break;
      } else {
        // Completed batch
        num = i;
        batchId = c[i].id;
        title = "You Complete " + c[i].title + " Batch";
      }
    }
    console.log(num);
    for (let j = 0; j <= num; j++) {
      amount += c[j].total_amount;
    }

    let x = `select t1.title,t2.helping_charges from imts_erp_student_batch t1 left join imts_erp_student_fee_immediate_charges t2 on t2.student_batch_id=t1.id where t1.student_id=?`;
    let y = [Id];
    let z = await db.query(x, y);
    let assignmentfee = 0;
    for (let i = 0; i < z.length; i++) {
      assignmentfee += z[i].helping_charges;
      if (title == z[i].title) {
        break;
      }
    }

    let obj = {
      title: title,
      batchId: batchId,
      batchno: num,
      assignmentfees: assignmentfee,
      amount: amount+assignmentfee
    }
    data.push(obj);

    res.json(data)
  }
  catch (err) {
    console.error(err);
    res.send("Error")
  }



}

exports.getFee = async (req, res) => {
  const { studentId, batchId } = req.body;

  let a1 = `select sum(pay) as paidFee from imts_erp_student_payment where student_id=? and status='2'`;
  let b1 = [studentId];
  let c1 = await db.query(a1, b1);

  let paidFee = c1[0].paidFee; // Initial paid fee
  
   let a = `
  SELECT 
    t1.id, 
    SUM(COALESCE(t2.total_amount, 0) + COALESCE(t3.helping_charges, 0)) AS total_amount, 
    SUM(COALESCE(t3.helping_charges, 0)) AS assignmentFee
FROM imts_erp_student_batch t1
JOIN imts_erp_student_fee_structure t2 
    ON t2.student_batch_id = t1.id
LEFT JOIN imts_erp_student_fee_immediate_charges t3 
    ON t3.student_batch_id = t1.id
WHERE t1.student_id = ? and t1.id<=?;
`;

  let b = [studentId, batchId];
  let rows = await db.query(a, b);
  const paymentResults = [];
  for (let row of rows) {
    const assignmentFee = row.assignmentFee || 0; // Handle null assignment fees
    const totalFee = row.total_amount; // Total fee is separate from assignment fee

    let assignmentFeePaid = 0;
    let feePaidForThisRow = 0;

    // Deduct total fee first
    if (paidFee > 0) {
      if (paidFee >= totalFee) {
        feePaidForThisRow = totalFee; // Full total fee is paid
        paidFee -= totalFee;
      } else {
        feePaidForThisRow = paidFee; // Partial payment for total fee
        paidFee = 0;
      }
    }

    // Deduct assignment fee after total fee
    if (paidFee > 0) {
      if (paidFee >= assignmentFee) {
        assignmentFeePaid = assignmentFee; // Full assignment fee is paid
        paidFee -= assignmentFee;
      } else {
        assignmentFeePaid = paidFee; // Partial payment for assignment fee
        paidFee = 0;
      }
    }

    // Calculate remaining fees
    const remainingAssignmentFee = assignmentFee - assignmentFeePaid;
    const remainingFee = totalFee - feePaidForThisRow; // Remaining total fee (if partially paid)

    // Push the result for the current row
    paymentResults.push({
      batchId: row.id,
      totalFee,
      assignmentFee,
      assignmentFeePaid,
      remainingAssignmentFee,
      feePaidForThisRow,
      remainingFee,
    });
  }

  console.log("Payment Results:", paymentResults);

  // let obj = {
  //   totalfee: "",
  //   payablefee: "",
  //   assignmentfee: "",
  //   payableassignmentfee: ""
  // }
  // let a = `select sum(pay) as paidFee from imts_erp_student_payment where student_id=?`;
  // let b = [studentId];
  // let c = await db.query(a, b);

  // let paidFee = c[0].paidFee;

  // let d = `select t1.id,sum(t2.total_amount) as total_fee from imts_erp_student_batch t1 join imts_erp_student_fee_structure t2 on t2.student_batch_id=t1.id where t1.student_id=?`;
  // let e = [studentId, batchId];
  // let f = await db.query(d, e);

  // let totalFee = f[0].total_fee;
  // obj.totalfee = totalFee;

  // let g = `select sum(helping_charges) as assignment_fee from imts_erp_student_fee_immediate_charges where student_id=?`;
  // let h = [studentId];
  // let i = await db.query(g, h);

  // let totalAssignmentfee = i[0].assignment_fee;
  // obj.assignmentfee = totalAssignmentfee;
  // let payablefee = 0;

  // if (paidFee >= totalFee) {
  //   obj.payablefee = 0;
  //   if ((paidFee - totalFee - totalAssignmentfee) >= 0) {
  //     obj.payableassignmentfee = 0;
  //   }
  // }
  // else {
  //   obj.payablefee = totalFee - paidFee;
  //   obj.payableassignmentfee = (totalAssignmentfee==null || totalAssignmentfee==0)?0:totalAssignmentfee- (paidFee - totalFee);
  // }
  // return res.send(obj);

  return res.send(paymentResults);
}
