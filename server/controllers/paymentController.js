const db = require('../config/database'); // Adjust the path to your DB connection file

exports.calculatePendingAmount = async (req, res) => {
  const { id } = req.params; // Extract student_id from URL parameter

  try {
    // Fetch the total fee structure for the student
    const fees = await db.query(
      "SELECT total_amount FROM imts_erp_student_fee_structure WHERE student_id = ?",
      [id]
    );

    // Sum the total fee amounts
    const totalFees = fees.reduce((sum, fee) => sum + fee.total_amount, 0);

    // Fetch the total payments made by the student
    const payments = await db.query(
      "SELECT SUM(pay) AS totalPaid FROM imts_erp_student_payment WHERE student_id = ?",
      [id]
    );

    const totalPaid = payments[0]?.totalPaid || 0;

    // Calculate the pending amount
    const pendingAmount = totalFees - totalPaid;

    // Respond with the calculated data
    res.json({
      studentId: id,
      totalFees,
      totalPaid,
      pendingAmount,
    });
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).json({ error: "Error fetching data" });
  }
};




exports.generatePaymentDetails = async (req, res) => {
  const { id } = req.params; // Extract student_id from URL parameter

  try {
    // Fetch fee details for the student from the fee structure table
    const fees = await db.query(
      "SELECT session, total_amount, installment_amount FROM imts_erp_student_fee_structure WHERE student_id = ?",
      [id]
    );

    // Respond with the fee details
    res.json({
      studentId: id,
      fees: fees.map((fee) => ({
        session: fee.session,
        totalAmount: fee.total_amount,
        installmentAmount: fee.installment_amount,
      })),
    });
  } catch (err) {
    console.error("Error fetching fee details:", err.message);
    res.status(500).json({ error: "Error fetching fee details" });
  }
};

exports.getApprovePaymentBetweenTwoDate = async (req, res) => {
  const { startdate, enddate } = req.body;


  console.log(req.body);

  const payments = await db.query(
    `SELECT SUM(pay) AS totalPaid FROM imts_erp_student_payment WHERE DATE(approved_at) BETWEEN ? AND ? and status='2'`,
    [startdate, enddate]
  );
  let response = ``;
  if (payments.length > 0) {
    response = `Your Approve Payment is ${payments[0].totalPaid}`;
  }
  else {
    response = `Record does not found in this date ${startdate}-${enddate}`;
  }
  res.send(response);


}
// module.exports={getApprovePaymentBetweenTwoDate}


