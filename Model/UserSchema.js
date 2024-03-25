 const mongoose = require('mongoose')

 const userschema = mongoose.Schema({
    name:{type : String},
    Email:{type : String},
    Password : {type : String}
 });
  
 const user = mongoose.model("user",userschema);

 module.exports = user;

 