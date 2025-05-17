const db = require('../config/database');
const bcrypt = require("bcryptjs");
const addManager = async (req, res) => {
    const { user_name, password, full_name, email, phone, photo } = req.body;

    let a = `insert into imts_erp_manager(user_name,password,full_name,email,phone,photo,added_by) values(?,?,?,?,?,?,?)`;
    let b = [user_name, password, full_name, email, phone, photo, "1"];
    let c = await db.query(a, b);
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('INSERT INTO imts_erp_users (email, password,user_type) VALUES (?, ?,3)', [email, hashedPassword], (error, results) => {
        if (error) throw error;

    });
    if (c) {
        return res.send("Manager Successfully Added");
    }
    else {
        return res.send("Manager does not Added");
    }
}
const getManager = async (req, res) => {
    let a = `select * from imts_erp_manager`;
    let b = await db.query(a);
    res.send(b);

}
const getSingleManager = async (req, res) => {
    const { Id } = req.query;

    let a = `select * from imts_erp_manager where id=?`;
    let b = [Id];
    let c = await db.query(a, b);

    let d = `select * from imts_erp_counsellor where added_by=?`;
    let e = [Id];
    let f = await db.query(d, e);

    return res.json({
        "manager": c,
        "counsellor": f
    });


}
const deletemanager = async (req, res) => {
    const Id = req.params.id;
    console.log(req.params);

    let a = `delete from imts_erp_manager where id=?`;
    let b = [Id];
    let c = await db.query(a, b);
    return res.send("Manager Successfully deleted");

}
module.exports = { deletemanager, addManager, getManager, getSingleManager }
