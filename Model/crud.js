const mongoose = require('mongoose')
// creating schema
const crudschema = mongoose.Schema({

    Name : {type : String},
    Email : {type : String},
    Mobile : {type : Number},
    Hobby : {type : String}
    
})
const crud = mongoose.model("crud",crudschema);

//create crud-database

const createcrud = async(req,res)=>{
    const {Name,Email,Mobile, Hobby} = req.body
    const crud_details = await crud.create({
        Name,Email,Mobile, Hobby
    })
    res.json(crud_details)
}
// viewcrud
const viewcrud = async(req,res)=>{
      const _id = req.params.id 
      const view_item = await crud.findById(_id)
      res.json(view_item)
}

const view = async(req,res)=>{
    const view_items = await crud.find()
     res.json(view_items)
}

//deletecrud

const deletecrud = async(req,res)=>{
    const _id = req.params.id
    const delete_item = await crud.findByIdAndDelete(_id)
    res.json("details are removed")
}
//update-crud
const updatecrud = async(req,res)=>{
    const {Name,Email,Mobile, Hobby} = req.body
    const _id = req.params.id
    const update_item = await crud.findByIdAndUpdate(_id,{Name,Email,Mobile, Hobby})
    res.json(update_item)
}


module.exports = {crud,createcrud,viewcrud,deletecrud,updatecrud,view}