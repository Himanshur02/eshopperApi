//  Cart Schema 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let cartSchema = new Schema(
    {
        productName :  {
            type: String,
            required: true
        },
        totalQuantity :  {
            type: Number,
            default : 0,
            required: true
        },
        totalPrice :  {
            type: Number,
            default : 0,
            required: true
        },
        image :  {
            type: String,    
        },
        status :  { type: String }
    },
    { collection: "cart"}
);
// Collection Name : Products
module.exports = mongoose.model("cart",cartSchema);