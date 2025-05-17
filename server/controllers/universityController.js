const db = require('../config/database');
const getUniversity = async (req, res) => {
    let a = `select name,id from imts_erp_university`;
    let c = await db.query(a);
    return res.send(c);

}
module.exports={getUniversity};
