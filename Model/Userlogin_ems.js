const bcrypt = require('bcrypt');
const user = require('./UserSchema');
const jwt = require('jsonwebtoken')

const userloginid = async(req, res) => {
    const { Email, Password } = req.body;

    console.log(Email);
    const loginpage = await user.findOne({ Email });
    console.log("yes");
    
    console.log('loginpage:', loginpage); 

    if (loginpage && (await bcrypt.compare(Password, loginpage.Password))) {
        const token = tokengenerate(loginpage._id); // Use loginpage._id instead of loginid._id
        res.json({ message: "Login successful", Token: token });
    } else {
        res.status(401).json({ message: "Failed to login. Incorrect email or password." });
    }
}

const tokengenerate = (token)=>{
    return jwt.sign({token},process.env.JWT_server,{
        expiresIn:'1d'
    })
}
module.exports = userloginid;
