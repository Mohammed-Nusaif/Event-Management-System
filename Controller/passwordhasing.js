
const bcrypt = require("bcrypt");
const user = require("../Model/UserSchema");

const createpass = async(req,res)=>{
    const {name,Email,Password}=req.body;
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(Password,salt)
    const empdetails = await user.create({
        name,Email,Password:hashedpassword

    })
    res.json(empdetails)
}
module.exports = createpass