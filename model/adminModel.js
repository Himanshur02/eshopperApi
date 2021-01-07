// Database Schema For admin
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let admin = new Schema(
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
        phone :  {
            type:Number,
            min:10
        },
        password :  {
            type:String,
            }
    },
    { collection: "admins"}
);

module.exports = mongoose.model("admins",admin);