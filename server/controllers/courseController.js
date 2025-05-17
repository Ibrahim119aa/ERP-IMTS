const db = require('../config/database');
const getCourse = async (req, res) => {
   

    let a = `select name,id from imts_erp_course `;
    
    let c = await db.query(a);
    
    return res.send(c);

}
module.exports={getCourse};
