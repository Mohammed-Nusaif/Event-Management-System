const mongoose = require('mongoose')

const userschema = mongoose.Schema({
   name:{type : String},
   Email:{type : String},
   Password : {type : String}
});
 
const User = mongoose.model("User",userschema);


module.exports = {User}