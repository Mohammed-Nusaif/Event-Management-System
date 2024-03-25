const user = require("../Model/UserSchema");

const CreateUser = async(req,res)=>{

    const {name,Email,Password}=req.body;
    const userdetails = await user.create({

        name,Email,Password
    })
    res.json(userdetails)
}
module.exports = CreateUser