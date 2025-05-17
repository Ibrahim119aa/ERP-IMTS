const db = require("../config/database");
const addExamMode = async (req, res) => {
    const { name, created_by } = req.body;

    let a = `insert into imts_erp_exammode(name,created_by) values(?,?)`;
    let b = [name, created_by];
    let c = await db.query(a, b);
    res.send("Last Status Successfully Added");
}
const getExamMode = async (req, res) => {
    let a = `select t1.name,t2.email as created_by,t1.id from imts_erp_exammode t1 left join imts_erp_user t2 on t2.id=t1.created_by`;
    let c = await db.query(a);
    res.send(c);

}
const deleteExamMode = async (req, res) => {
    const id = req.params.id;
    let a = `delete from imts_erp_exammode where id=?`;
    let b = [id];
    let c = await db.query(a, b);
    res.send("Exam Mode Successfully deleted");

}
const getSingleExamMode = async (req, res) => {
    const Id = req.params.id;
    let a = `select t1.name,t2.email from imts_erp_exammode t1 join imts_erp_user t2 on t2.id=t1.created_by where t1.id=?`;
    let b = [Id];
    let c = await db.query(a, b);
    if (c.length > 0) {
        return res.send(c[0]);
    }
    else {
        return res.send("Record does not found");
    }
}
const UpdateExamMode = async (req, res) => {
    const id = req.params.id;




    let a = `update imts_erp_exammode set name=? where id=?`;
    let b = [req.body.name, id];
    let c = await db.query(a, b);
    res.send("Exam Mode  Successfully Updated");
}
module.exports = { addExamMode, UpdateExamMode, getExamMode, deleteExamMode, getSingleExamMode }