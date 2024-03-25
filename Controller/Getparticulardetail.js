const user = require("../Model/UserSchema")

const getdetail = async(req,res) =>{
    const id = req.params.demo
    const userid = await user.findById(id)
    res.json(userid)
}

module.exports = getdetail