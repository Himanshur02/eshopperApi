// Create Category Schema 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let categorySchema = new Schema(
    {
        categoryName :  { type: String },
        description :  { type: String },
        status :  { type: String }
    },
    { collection: "categories"}
);
// Collection Name : Products
module.exports = mongoose.model("categories",categorySchema);