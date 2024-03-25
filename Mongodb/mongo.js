const mongoose = require('mongoose')
const connection = async()=>{
    try{
        const connect = await mongoose.connect("mongodb+srv://nusaiffanukp:Nsf1234@cluster0.7nhl0wx.mongodb.net/?retryWrites=true&w=majority")
        console.log('database is connected');
    }
    catch(err){
        console.log(`error :${err}`);
        process.exit
    }
}
module.exports = connection