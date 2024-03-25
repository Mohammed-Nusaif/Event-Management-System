const user = require("../Model/UserSchema")

const getitems = async(req,res)=>{

    const user3 = await user.find()
    res.json(user3)
}

module.exports = getitems