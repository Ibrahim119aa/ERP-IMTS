const db = require('../config/database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



exports.register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query('INSERT INTO imts_erp_users (email, password) VALUES (?, ?)', [email, hashedPassword], (error, results) => {
            if (error) throw error;
            res.send('User registered successfully');
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;


    let a = `CALL GetUserByEmail(?);`;
    let b = [email];
    let c = (await db.query(a, b)).flat();
    console.log(c[0]?.email!="");
    
    
    if (c[0]?.email==null) {
        console.log("Null Check");
        
        return res.status(200).json({
            success: false,
            message: "Incorrect email or Password",

        })
    }
    else {
        try {
            if (await bcrypt.compare(password, c[0].password)) {
                const user = { role: c[0].user_type, email: c[0].email, id: c[0] };
                const token = jwt.sign(user, process.env.JWT_SECRET_KEY);
                console.log("User");

                return res.status(200).json({
                    success: true,
                    message: "User login sucessfully",
                    token, user
                })
            } else {
                res.status(200).json({
                    success: false,
                    message: "Incorrect email or Password",

                })
            }
        } catch (error) {
            console.log("err");
            return res.status(200).json({
                success: false,
                message: "Incorrect email or Password",

            })
        }
    }



}

