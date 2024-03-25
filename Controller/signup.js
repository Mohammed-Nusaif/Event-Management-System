const user = require("../Model/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signup = async (req, res) => {
  const { name, Email, Password } = req.body;

  const existinguser = await user.findOne({ Email });

  if (existinguser) {
    res.json("user already exist");
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(Password, salt);
    const userid = await user.create({ name, Email, Password: hashedpassword });
    res.json({
      Id: userid._id,
      Name: userid.name,
      Email: userid.Email,
      Password: userid.Password,
      Token: tokengenerate(userid._id),
    });
  }
  // catch(Error){
  //     console.error("Error in signup",Error);
  //     res.json({Error:"internal server Error"})
  // }
};

const tokengenerate = (id) => {
  return jwt.sign({ id }, process.env.JWT_server, {
    expiresIn: "1d",
  });
};

module.exports = signup;
