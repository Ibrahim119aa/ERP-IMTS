const db = require('../config/database');
const getExam = async (req, res) => {
    let a = `select name,id from imts_erp_exam_batch`;
    let c = await db.query(a);
    return res.send(c);

}
module.exports={getExam};
