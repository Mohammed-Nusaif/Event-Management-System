
const express = require('express')
const demo = require('../Middleware/demo')
const CreateUser = require('../Controller/CreateUser')
const CreateProduct = require('../Controller/CreateProduct')
const getitems = require('../Controller/GetItems')
const getdetail = require('../Controller/Getparticulardetail')
const { vehicle, getvehicle, deletevehicle, updatevehicle } = require('../Model/VehicleSchema')
const createvehicle = require('../Controller/Createvehicle')
const deleteitem = require('../Controller/DeleteUser')
const updateUser = require('../Controller/UpdateUser')
const { createmobile, getmobile, updatemobile, deletemobile } = require('../Model/mobilephone')
const createpass = require('../Controller/passwordhasing')
const { createcourse } = require('../Model/ArraySchema')
const signup = require('../Controller/signup')
const loginid = require('../Controller/Login')
const tokenup = require('../Controller/Tokengeneration')
const protect = require('../Middleware/tokenverification')
const { createcrud, viewcrud, deletecrud, updatecrud, view } = require('../Model/crud')
const { viewevent, createeventcrud, vieweventcrud, deleteeventcrud, updateeventcrud } = require('../Model/Ems')
const {  adminLogin, verifyToken, adminsignup } = require('../Model/AdminModelEms')
const userloginid = require('../Model/Userlogin_ems')
const usersignup = require('../Model/Usersignup_ems')



const router = express.Router()
const middleware = [protect]

router.route('/').get(demo)
//router of user-------------------------------------------------
router.route('/create').post(CreateUser)
router.route('/update/:id').put(updateUser)
router.route('/delete/:id').delete(deleteitem)
router.route('/get').get(getitems)
//router of products-------------------------------------------
router.route('/products').post(CreateProduct)
//router of vehicle---------------------------------------
router.route('/detail/:demo').get(getdetail)
router.route('/vehicles').post(createvehicle)
router.route('/vehicledetails/:sample').get(getvehicle)
router.route('/updatevehicle/:id').put(updatevehicle)
router.route('/remove/:id').delete(deletevehicle)
//router of product-mobile----------------------------------------
router.route('/createmob').post(createmobile)
router.route('/getmob/:id').get(getmobile)
router.route('/updatemob/:id').put(updatemobile)
router.route('/deletemob/:id').delete(deletemobile)
//----------------------------------------------------------------------
router.route('/createpass').post(createpass)

router.route('/createcourse').post(createcourse)

//token generation
router.route('/signup').post(signup)

router.route('/login').post(loginid)

router.route('/signup2').post(tokenup)

//tokenverification
router.route('/verification').get(middleware,signup)

//crud
router.route('/createcrud').post(createcrud)
router.route('/viewcrud/:id').get(viewcrud)
router.route('/deletecrud/:id').delete(deletecrud)
router.route('/updatecrud/:id').put(updatecrud)
router.route('/viewitems').get(view)
//eventcrud
router.route('/createevent').post(createeventcrud)
router.route('/viewevent/:id').get(vieweventcrud)
router.route('/deleteevent/:id').delete(deleteeventcrud)
router.route('/updateevent/:id').put(updateeventcrud)
router.route('/vieweventitems').get(viewevent)

// // userLogin_ems && signup
router.route('/userlogin').post(userloginid)
router.route('/usersignup').post(usersignup)

//adminlogin
router.route('/adminsignup').post(adminsignup)
router.route('/adminLogin').post(adminLogin)
router.get('/admin/dashboard', verifyToken, (req, res) => {
    res.json({ message: `Welcome, ${req.username}! This is the admin dashboard.` });
  });

module.exports = router