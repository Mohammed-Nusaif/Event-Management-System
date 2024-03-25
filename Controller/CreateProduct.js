const product1 = require("../Model/Product");

const CreateProduct = async(req,res)=>{
    const{ product_name,price ,size ,color } = req.body;
    const productdetails = await product1.create({
        product_name,price ,size ,color
    })
    res.json(productdetails)

}

module.exports = CreateProduct