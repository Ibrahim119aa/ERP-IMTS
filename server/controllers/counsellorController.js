const db = require('../config/database');
const bcrypt = require("bcryptjs");
// const { v4: uuidv4 } = require("uuid");
const addCounsellor = async (req, res) => {
    const { user_name, password, full_name, email, phone, photo, active } = req.body;



    let a = `insert into imts_erp_counsellor(user_name,password,full_name,email,uid,status) values(?,?,?,?,?,?)`;

    const hashedPassword = await bcrypt.hash(password, 10);
    // const uid = uuidv4();
    let b = [user_name, hashedPassword, full_name, email, "1", active];
    let c = await db.query(a, b);





    db.query('INSERT INTO imts_erp_users (email, password,user_type) VALUES (?, ?,2)', [email, hashedPassword], (error, results) => {
        if (error) throw error;
       
    });

    if (c) {
        return res.send("Responsible Person Successfully Added");
    }
    else {
        return res.send("Responsible Person does not Added");
    }
}
const getCounsellor = async (req, res) => {
    let a = `select * from imts_erp_counsellor  order by id desc`;
    let b = await db.query(a);
    res.send(b);

}
const getSingleCounsellor = async (req, res) => {
    const { Id } = req.query;

    // Fix: Add the correct table name in the SQL query
    let a = `SELECT * FROM imts_erp_counsellor WHERE id=?`;
    let b = [Id];
    let c = await db.query(a, b);

    let d = `SELECT id, name, email, phone FROM imts_erp_student WHERE responsable_person_id=?`;
    let e = [Id];
    let f = await db.query(d, e);

    res.json(
        {
            "counsellor": c,
            "student": f
        }
    );
}

const assignCounsellorToManager = async (req, res) => {
    console.log(req.body);
    const { counsellor, manager } = req.body;

    for (let i = 0; i < counsellor.length; i++) {
        let a = `update imts_erp_counsellor set added_by=? where id=?`;
        let b = [manager, counsellor[i].id];
        let c = await db.query(a, b);
    }
    return res.send("Manager Successfully Assign to Counsellor");

}

const getCounsellorByName = async (req, res) => {
    let a = await db.query("select id,full_name from imts_erp_user where user_type=1");

    res.send(a);
}
const deleteCounsellor = async (req, res) => {
    const id = req.params.id;
    let a = `delete from imts_erp_counsellor where id=?`;
    let b = [id];
    let c = await db.query(a, b);
    return res.send("Counselor Successfully deleted")

}
module.exports = { deleteCounsellor, getSingleCounsellor, getCounsellorByName, addCounsellor, getCounsellor, assignCounsellorToManager }
