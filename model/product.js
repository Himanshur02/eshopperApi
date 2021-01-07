// Create Product Schema 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let productSchema = new Schema(
    {
        productName :  {
            type: String,
            required: true
        },
        description :  {
            type: String,
            required: true
        },
        category :  {
            type: String,
            required: true
        },
        quantity :  {
            type: Number,
            required: true
        },
        price :  {
            type: Number,
            required: true
        },
        image :  {
            type: String,    
        },
        status :  { type: String }
    },
    { collection: "products"}
);
// Collection Name : Products
module.exports = mongoose.model("products",productSchema);