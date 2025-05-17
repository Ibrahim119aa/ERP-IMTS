const db = require("../config/database");
const addLastStatus = async (req, res) => {
    const { name, created_by } = req.body;

    let a = `insert into imts_erp_laststatus(name,created_by) values(?,?)`;
    let b = [name, created_by];
    let c = await db.query(a, b);
    res.send("Last Status Successfully Added");
}
const getLastStatus = async (req, res) => {
    let a = `select t1.name,t2.email as created_by,t1.id from imts_erp_laststatus t1 left join imts_erp_user t2 on t2.id=t1.created_by`;
    let c = await db.query(a);
    res.send(c);

}
const deleteLastStatus = async (req, res) => {
    const Id = req.params.id;
    let a = `delete from imts_erp_laststatus where id=?`;
    let b = [Id];
    try {
        let c = await db.query(a, b);
        return res.send("Last Status Successfully deleted");
    }
    catch (err) {
        return res.send(err.messsage);
    }



}
const getSingleLastStatus = async (req, res) => {
    const Id = req.params.id;
    let a = `select t1.name,t2.email from imts_erp_laststatus t1 join imts_erp_user t2 on t2.id=t1.created_by where t1.id=?`;
    let b = [Id];
    let c = await db.query(a, b);
    if (c.length > 0) {
        return res.send(c[0]);
    }
    else {
        return res.send("Record does not found");
    }

}
const UpdateLastStatus = async (req, res) => {
    const id = req.params.id;




    let a = `update imts_erp_laststatus set name=? where id=?`;
    let b = [req.body.name, id];
    let c = await db.query(a, b);
    res.send("Last Status Successfully Updated");
}
module.exports = { addLastStatus, getLastStatus, deleteLastStatus, getSingleLastStatus, UpdateLastStatus }