const mongoose = require('mongoose')
const user = require('./UserSchema')

const productschema = mongoose.Schema({
    product_name: {type: String},
    price : {type: Number},
    size : {type : Number},
    color : {type : String}
})

const product1= mongoose.model("product1",productschema)

const getproduct =  async(req,res)=>{
    const _id = req.params.id 
    const gettheproduct = await user.findById(_id)
    

}
module.exports  = product1;

