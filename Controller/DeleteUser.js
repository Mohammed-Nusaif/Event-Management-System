const user = require("../Model/UserSchema");

const deleteitem = async(req,res)=>{

    const _id = req.params.id;
    const user1 = await user.findByIdAndDelete(_id)
    res.json("user deleted")    
}

module.exports = deleteitem