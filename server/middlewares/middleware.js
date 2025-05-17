const jwt = require("jsonwebtoken");
require("dotenv").config();     
exports.authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log(token); 
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token is missing",
        });
    }

    
    const extractedToken = token.replace("Bearer ", "");

    jwt.verify(extractedToken, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: "Invalid token",
                error: err.message,
            });
        }

        req.user = user; 
        console.log(user); 
        next();
    });
};


exports.isAdmin = async (req, res, next) => {
    try {
        console.log(req.user.role)
        if (req.user.role !== "admin") {
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: "Error in admin =",
        });
    }
};
exports.isCounselor = async (req, res, next) => {
    try {
        console.log(req.user.role)
        if (req.user.role !== "counselor") {
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: "Error in admin =",
        });
    }
};
// exports.isStudent = async (req, res, next) => {
//     try {
//         console.log(req.user.role)
//         if (req.user.role !== "student") {
//             return res.status(401).send({
//                 success: false,
//                 message: "UnAuthorized Access",
//             });
//         } else {
//             next();
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(401).send({
//             success: false,
//             message: "Error in admin =",
//         });
//     }
// };