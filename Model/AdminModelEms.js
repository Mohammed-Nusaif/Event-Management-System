const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Admin model
const adminSchema = new mongoose.Schema({
    adminname: { type: String, required: true },
    password: { type: String, required: true },
});
const Admin = mongoose.model('Admin', adminSchema);

// Admin Signup

const adminsignup = async (req, res) => {
  const { adminname, password } = req.body;

  const adminuser = await Admin.findOne({ adminname });

  if (adminuser) {
    res.json("user already exist");
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    const adminid = await Admin.create({  adminname, password: hashedpassword });
    res.json({
      Id: adminid._id,
      Adminid: adminid.adminname,
      password: adminid.password,
      Token: tokengenerate(adminid._id),
    });
  }
};

const tokengenerate = (id) => {
  return jwt.sign({ id }, process.env.JWT_server, {
    expiresIn: "1h",
  });
};


// Admin Login
const adminLogin = async (req, res) => {
    const { adminname, password } = req.body;

    try {
        const admin = await Admin.findOne({ adminname });

        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(admin._id);
        res.json({ message: 'Login successful',message: 'hai admin', Token: token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_server, {
        expiresIn: '1h'
    });
};

// Verify token middleware
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).send('No token provided');
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_server);
        req.userId = decoded.userId; // Attach userId to request object for further use
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(401).send('Invalid token');
    }
};

module.exports = { Admin, adminLogin, verifyToken, adminsignup };
