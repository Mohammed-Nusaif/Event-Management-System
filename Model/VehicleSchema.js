const mongoose = require('mongoose')

const vehicleschema = mongoose.Schema({
    Vehicle_name :{type : String} ,
    Model :{type : Number},
    Number_Plate:{type : Number},
    Color:{type : String}
})

const vehicle = mongoose.model("vehicle",vehicleschema)


const getvehicle = async(req,res) =>{
    const color = req.params.sample
    const vehiclecolor = await vehicle.findById(color)
    res.json(vehiclecolor)
}




const deletevehicle =async(req,res)=>{
    const _id = req.params.id;
    const deleted = await vehicle.findByIdAndDelete(_id)
    res.json("vehicle deleted")
}

const updatevehicle = async(req,res)=>{

    const { Vehicle_name,Model,Number_Plate,Color} = req.body;
    const _id = req.params.id
    const updated = await vehicle.findByIdAndUpdate(_id,{ Vehicle_name,Model,Number_Plate,Color})
    res.json(updated)
}
module.exports = {vehicle,getvehicle,deletevehicle,updatevehicle}