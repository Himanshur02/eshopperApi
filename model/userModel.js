// Database Schema For User
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let user = new Schema(
    {
        firstName :  {
            type: String,
            trim:true,
            min:3,
            max:255 
        },
        lastName :  {
            type: String,
            trim:true,
            min:3,
            max:255 
        },
        email :  {
            type:String,
            trim:true,
            max:255,
            min:8
        },
        password :  {
            type:String,
            trim:true,
            max:255,
            min:6
            },
        address : {
            type:String
         },
        street : {
            type:String 
        },
        city:  {
            type:String 
        },
        state:  {
            type:String 
        },
        zip:  {
            type:Number 
        },
        isActive :  {
            type: Boolean,
            default: true
        },
        createdOn :  {
            type: Date,
            default: Date.now()
        },
    },
    { collection: "users"}
);

module.exports = mongoose.model("users",user);