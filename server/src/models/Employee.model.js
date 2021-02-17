const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const Joi = require('joi');

const EmployeeSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    }
})

function validateData(value){
    const schema = Joi.object({
        username:Joi.string().required(),
        email:Joi.string().email().required(),
        address:Joi.string().required(),
        phone:Joi.number().required().min(10)
    })

    return schema.validate(value)
}

const Employee = mongoose.model('Employee', EmployeeSchema)
module.exports = {Employee, validateData}