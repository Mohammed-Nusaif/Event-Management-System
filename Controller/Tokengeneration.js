const user = require("../Model/UserSchema");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const tokenup = async(req,res)=>{
    const {name,Email,Password}=req.body;
    try{
        const tokenuser = await user.findOne({Email})

        if(tokenuser){
            
            res.json("user already exist")
        }
        else{

            const salt = await bcrypt.genSalt(10)
            const hashedpassword = await bcrypt.hash(Password,salt)

            const tokenid = await user.create({name,Email,Password:hashedpassword})
            res.json({ 
                Id:tokenid._id,
                Name : tokenid.name,
                Email:tokenid.Email,
                Password:tokenid.Password,
                Token:tokengenerate(tokenid._id)
            
            })
        }
        
    }
    catch(Error){
        console.error("Error in signup",Error);
        res.json({Error:"internal server Error"})
    }
       const tokengenerate=(id)=>{
        return jwt.sign({id},process.env.JWT_server,{
            expiresIn:'1d'
        })
       } 
}     
module.exports = tokenup;
    
    