const user = require("../Model/UserSchema");

const updateUser = async(req,res)=>{
    const {name,Email,Password}=req.body;
    const _id = req.params.id
    const updateditem = await user.findByIdAndUpdate(_id,{name,Email,Password})
    res.json(updateditem)

}
module.exports = updateUser