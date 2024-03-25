const mongoose =require('mongoose')

const arraySchema = mongoose.Schema({
    coursename : {type:String},
    rollnumber:{type:Number},
    duration: [{
        name:{type:String},
        courseduration:{type:Number}
    }]


})
const course = mongoose.model("course",arraySchema)
// create course 
const  createcourse = async(req,res)=>{

    const {coursename,rollnumber,durationsvar} = req.body
    const coursedetails = await course.create({

        coursename,rollnumber,duration:durationsvar
    })
    res.json(coursedetails)
}
module.exports = {arraySchema,createcourse}
