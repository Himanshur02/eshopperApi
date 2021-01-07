// Create Database Schema 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let profileSchema = new Schema(
    {
        name :  {type: String },
        imagePath :  {type: String}
    },
    { collection: "Profile"}
);
// Collection Name : todoList
module.exports = mongoose.model("Profile",profileSchema);