const mongoose = require('mongoose')

const MobilePhoneschema = mongoose.Schema({
    model_name:{type:String},
    company : {type:String},
    color: {type:String},
    price:{type:Number}
})
const mobileuser = mongoose.model("mobileuser",MobilePhoneschema)
//create the mobile
const createmobile = async(req,res)=>{

    const {model_name,company,color,price}=req.body
    const createdmobile = await mobileuser.create({model_name,company,color,price})
    res.json(createdmobile)
}
//--------------------------------------
const getmobile = async(req,res)=>{
   const _id = req.params.id
   const getedmobile = await mobileuser.findById(_id)
    res.json(getedmobile)
}
//---------------------------------------
const deletemobile = async(req,res)=>{
    const _id = req.params.id
    const deletedmobile = await mobileuser.findByIdAndDelete(_id)
    res.json("mobiledeleted")
}
//---------------------------------------
const updatemobile = async(req,res)=>{
    const {model_name,company,color,price}=req.body
    const _id = req.params.id
    const updatedmobile = await mobileuser.findByIdAndUpdate(_id,{model_name,company,color,price})
    res.json(updatedmobile)
}
module.exports = {mobileuser,createmobile,getmobile,deletemobile,updatemobile}