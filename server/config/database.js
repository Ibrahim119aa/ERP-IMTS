const mysql = require("mysql");
const util = require("util");


const db = mysql.createConnection({
  user: "root",
  password: "",
  port:  3306,
  database:"crm_imts",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database Connected");
});
db.query = util.promisify(db.query);

module.exports = db;
