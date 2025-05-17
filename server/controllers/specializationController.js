const db = require('../config/database');
const getSpecialization = async (req, res) => {
    let a = `select name,id from imts_erp_specialization`;
    let c = await db.query(a);
    return res.send(c);

}
module.exports={getSpecialization};
