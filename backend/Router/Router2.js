const express = require('express')
const { createeventcrud, vieweventcrud, deleteeventcrud, updateeventcrud, viewevent } = require('../Model/Usercrud')
const { signup, loginid, getnamewithtoken } = require('../Controller/Authentication')
const protect = require('../Middleware/tokenverify')
const router = express.Router()

// const middleware = [protect]

//crud
router.route('/createcrud').post(createeventcrud)
router.route('/vieweventcrud/:id').get(vieweventcrud)
router.route('/deletecrud/:id').delete(deleteeventcrud)
router.route('/updatecrud/:id').put(updateeventcrud)
router.route('/viewevent').get(viewevent)

// authentication
router.route('/signup').post(signup)
router.route('/login').post(loginid)
router.route('/getname').get(getnamewithtoken)

// //token verify
// router.route('/verification').get(middleware,signup)










module.exports=router