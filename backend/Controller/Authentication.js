const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../Model/Userschme");


//user signup 

const signup = async (req, res) => {
    const { name, Email, Password } = req.body;
  
    const existinguser = await User.findOne({ Email });
  
    if (existinguser) {
      res.json("user already exist");
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(Password, salt);
      const userid = await User.create({ name, Email, Password: hashedpassword });
      res.json({
        Id: userid._id,
        Name: userid.name,
        Email: userid.Email,
        Password: userid.Password,
        Token: tokengenerate(userid._id),
      });
    }
  };
  
const tokengenerate = (id) => {
    return jwt.sign({ id }, process.env.JWT_server, {
      expiresIn: "1d",
    });
  };

  //user login

  const loginid = async(req, res) => {
    const { Email, Password } = req.body;

    console.log(Email);
    const loginpage = await User.findOne({ Email });
    console.log("yes");
    
    console.log('loginpage:', loginpage); 

    if (loginpage && (await bcrypt.compare(Password, loginpage.Password))) {
        const token = tokengenerate(loginpage._id); // Use loginpage._id instead of loginid._id
        res.json({ message: "Login successful", Token: token });
    } else {
        res.status(401).json({ message: "Failed to login. Incorrect email or password." });
    }
}
 
//get name with id

 
const getnamewithtoken = async (req, res) => {
    // Extract the token from the Authorization header
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; 

    // Check if the token exists
    if (!token) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    try {
        // Verify and decode the JWT token
        const decoded = jwt.verify(token, process.env.JWT_server);
        
       
        const user = await User.findById(decoded.id);

        // If user is not found, return an error response
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // If user is found, return the user's name
        res.json({ Name: user.name });
    } catch (error) {
        // Handle errors related to token verification
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = {signup,loginid,getnamewithtoken,tokengenerate}
