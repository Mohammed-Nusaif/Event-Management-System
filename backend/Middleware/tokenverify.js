const jwt = require('jsonwebtoken');
const { User } = require('../Model/Userschme');


const protect = async(req,res,next)=>{
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            jwt.verify(token,process.env.JWT_server);
            next();
        } catch (error) {
            res.status(401).send("No token");
        }
    }
    if(!token){
        res.status(401).send("No Token")
    }
};

module.exports = protect;