const { vehicle } = require("../Model/VehicleSchema");

const createvehicle = async(req,res)=>{
    
    const { Vehicle_name,Model,Number_Plate,Color} = req.body;
    const vehicledetail = await vehicle.create({
        Vehicle_name,Model,Number_Plate,Color
    })
    res.json (vehicledetail)
}
module.exports = createvehicle;