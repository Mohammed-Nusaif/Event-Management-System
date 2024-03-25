const mongoose = require('mongoose')
// creating schema
const eventcrudschema = mongoose.Schema({

    Name : {type : String},
    booked_date : {type : Date},
    venue : {type : String},    
    event_date : {type :Date}
})
const eventcrud = mongoose.model("eventcrud",eventcrudschema);

//create crud-database

const createeventcrud = async(req,res)=>{
    const {Name,booked_date,venue,event_date} = req.body
    const crud_details = await eventcrud.create({
        Name,booked_date,venue,event_date
    })
    res.json(crud_details)
}
// viewcrud
const vieweventcrud = async(req,res)=>{
      const _id = req.params.id 
      const view_item = await eventcrud.findById(_id)
      res.json(view_item)
}

const viewevent = async(req,res)=>{
    const view_items = await eventcrud.find()
     res.json(view_items)
}

//deletecrud

const deleteeventcrud = async(req,res)=>{
    const _id = req.params.id
    const delete_item = await eventcrud.findByIdAndDelete(_id)
    res.json("details are removed")
}
//update-crud
const updateeventcrud = async(req,res)=>{
    const {Name,booked_date,venue,event_date} = req.body
    const _id = req.params.id
    const update_item = await eventcrud.findByIdAndUpdate(_id,{Name,booked_date,venue,event_date})
    res.json(update_item)
}


module.exports = {eventcrud,createeventcrud,vieweventcrud,deleteeventcrud,updateeventcrud,viewevent}