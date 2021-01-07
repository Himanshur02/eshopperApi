var product_db = require('../model/product');
var category_db = require('../model/category');
var user_db = require('../model/userModel');
var product_db = require('../model/product');
var cart_db = require('../model/cart');
var Profile = require('../model/profile');
var nodemailer = require('nodemailer');
var configFile = require("../config/config.json");

//Get All Category List
exports.get_category = (req,res) => {
    category_db.find({},(err,result)=>{
        if(err) {
            res.json({
                status : 404,
                message : "Category Not Found"
            });
        } else {
            res.status(200).json(result);
        }
    });
}

// Get A Particular Category
exports.get_categoryById = (req,res) => {
    category_db.find( { _id : req.params.id },(err,result)=>{
        if(err) {
            res.json({
                success :false,
                status : 404,
                message : "Category Not Found"
            });
        } else {
            res.json(result[0]);
        }
    });
 }

 // Add Category
exports.add_Category = (req,res) =>{
    let category = category_db();
    category.categoryName = req.body.categoryName; 
    category.description = req.body.description; 
    category.status = "Pending"; 
    category.save((err,result)=>{
        if(err) {
            res.json(err);
        } else {
            res.json({
                success:true,
                status:200,
                message: 'Category Added successfully',
                result :{
                    categoryName :result.categoryName,
                    description :result.description        
                }
                });
            }
        });
    }


// Update Category
exports.update_category = (req,res) => {
    var updateCategory =  req.body;
    category_db.findOneAndUpdate({_id : req.params.id }, updateCategory, {new:true},(err,result)=> {
    if(err) {
            res.json({
                status : 404,
                message : "Category Not Found"
            });
        }   else {
            res.status(200).json("Category Updated Successfully");
        }
    });
}

// Delete Category
exports.delete_category = (req,res) => {
    category_db.findByIdAndRemove({_id : req.params.id },(err,result)=> {
    if(result) {
        res.status(200).json("Category Deleted Successfully");
        }   else {
            res.status(404).json("Category Not Found");      
        }
    })
}

//Search Category
 exports.search_category = (req,res) => {
    var searchKeywords = req.body.searchKeywords;
    var pageNumber = parseInt(req.params.pageNumber);
    let pageLimit = 5;
    category_db.find({ categoryName:{$regex:searchKeywords , $options: 'i' }},(err,result)=>{
        if(err) {
            res.json({
                status : 404,
                message : "Category Not Found"
            });
        } else {
            res.status(200).json(result);
        }
    }).sort({"categoryName" : 1 }).skip((pageNumber - 1) * pageLimit ).limit(pageLimit);
};

// Add A Product
exports.add_product = (req,res) =>{
    let product = product_db();
    product.productName = req.body.productName;
    product.description = req.body.description;
    product.category = req.body.category;
    product.quantity = parseInt(req.body.quantity);
    product.image = req.body.image;
    product.price = parseInt(req.body.price);
    product.status = "Available" ;
    product.save((err,result)=>{
        if(err) {
            res.json(err);
        } else {
            res.json({
                success:true,
                status:200,
                message: 'Product Added successfully',
                result :{
                productName:result.productName,
                description:result.description,
                quantity: result.quantity,
                category: result.category,
                image: result.image,
                price: result.price,
                status: result.status
                }
                });
            }
        });
    }

//Get All Product List
exports.get_products = (req,res) => {
    var pageNumber = parseInt(req.params.pageNumber);
    let pageLimit = 6;
    product_db.find({},(err,result)=>{
        if(err) {
            res.json({
                status : 404,
                message : "Product Not Found"
            });
        } else {
            res.status(200).json(result);
        }
    }).sort({"productName" : 1 }).skip((pageNumber - 1) * pageLimit ).limit(pageLimit);
}

// ALl Products By Category
exports.get_productsByCategoryName = (req,res) => {
    var pageNumber = parseInt(req.params.pageNumber);
    let pageLimit = 6;
    var categoryName = req.params.categoryName;
    product_db.find({ category : categoryName },(err,result)=>{
        if(err) {
            res.json({
                status : 404,
                message : "Product Not Found"
            });
        } else {
            res.json(result);
        }
    }).sort({"productName" : 1 }).skip((pageNumber - 1) * pageLimit ).limit(pageLimit);;
}

//Count Product List By Category Name 
exports.get_productsByCategory = (req,res) => {
    var categoryName = req.params.categoryName;
    product_db.find({ category : categoryName },(err,result)=>{
        if(err) {
            res.json({
                status : 404,
                message : "Product Not Found"
            });
        } else {
            product_db.countDocuments({ category : categoryName },(req,count)=>{
                res.json({
                    status : 200,
                    count : count,
                    result : result
                });
            })
        }
    });
}

// Get A Particular Product
exports.get_productById = (req,res) => {
    product_db.find( { _id : req.params.id },(err,result)=>{
        if(err) {
            res.json({
                success :false,
                status : 404,
                message : "Product Not Found"
            });
        } else {
            res.json(result[0]);
        }
    });
 }

// Get A Particular Product
exports.get_productCount = (req,res) => {
    var categoryName = req.params.categoryName;
    product_db.countDocuments({ category : categoryName },(err,result)=>{
        if(err) {
            res.json({
                success :false,
                status : 404,
                message : "No Product Found"
            });
        } else {
            res.json(result);
        }
    });
 }

// Update Product
exports.update_product = (req,res) => {
    console.log(req.body);
    var updateProduct =  req.body;
    product_db.findOneAndUpdate({_id : req.params.id }, updateProduct, {new:true},(err,result)=> {
    if(err) {
            res.json({
                status : 404,
                message : "Product Not Found"
            });
        }   else {
            res.status(200).json({ message : "Product Updated Successfully" });
        }
    });
}

// Delete Product
exports.delete_product = (req,res) => {
    product_db.findByIdAndRemove({_id : req.params.id },(err,result)=> {
    if(result) {
        res.status(200).json("Product Deleted Successfully");
        }   else {
            res.status(404).json("Product Not Found");      
        }
    })
}

//Search Product
exports.search_product = (req,res) => {
    var searchKeywords = req.body.searchKeywords;
    var pageNumber = parseInt(req.params.pageNumber);
    let pageLimit = 6;
    product_db.find({ productName:{$regex:searchKeywords , $options: 'i' }},(err,result)=>{
        if(err) {
            res.json({
                status : 404,
                message : "Product Not Found"
            });
        } else {
            res.status(200).json(result);
        }
    }).sort({"productName" : 1 }).skip((pageNumber - 1) * pageLimit ).limit(pageLimit);
    
};

// Add Product To Cart 
exports.add_To_cart = (req,res) => {
    var productId = req.params.id;
    product_db.find( { _id : productId },(err,result)=>{
        if(err) {
            res.json({
                success :false,
                status : 404,
                message : "Product Not Found"
            });
        } else {
            let cart = cart_db();
            cart.productName = result[0].productName;
            cart.totalQuantity = cart.totalQuantity+1;
            cart.image = result[0].image;
            cart.totalPrice = result[0].price;
            cart.status = "In Stock" ;
            cart.save((err,result)=>{
                if(err) {
                    res.json(err);
                } else {
                    res.json({
                        success:true,
                        status:200,
                        message: 'Product Added To Cart successfully',
                        result :{
                        id : result._id,
                        productName:result.productName,
                        totalQuantity:result.totalQuantity,
                        image: result.image,
                        totalPrice: result.totalPrice,
                        image: result.image,
                        status: result.status
                        }
                        });
                    }
                });
                    
                }
            });
 }

 //Get All Products In Cart
exports.get_cart_items = (req,res) => {
    cart_db.find({},(err,result)=>{
        if(err) {
            res.json({
                status : 404,
                message : "404 Not Found"
            });
        } else {
            res.status(200).json(result);
        }
    });
}

// Delete Item In Cart
exports.delete_itemInCart = (req,res) => {
    cart_db.findByIdAndRemove({_id : req.params.id },(err,result)=> {
    if(result) {
        res.status(200).json("Product Deleted Successfully");
        }   else {
            res.status(404).json("Product Not Found");      
        }
    })
}

 //Calculate Total Price In Cart
 exports.get_totalprice = (req,res) => {
    cart_db.aggregate([{ $group: { _id: "$id", Totalprice : { $sum: "$totalPrice" }} }]).then((result)=>{
        res.status(200).json(result);
     }).catch((err)=>{
         res.status(404).json(err);
     });
}

// Send Mail To User For Purchased Order
exports.confirmOrder_Mail = (req,res) => {
    var userEmail = req.params.id;
    console.log(userEmail);
    user_db.findOne({email : userEmail },(err,result)=> {
        console.log(result.firstName);
    if(err) {
        res.status(404).json("User Not Found");    
        }   else {
            var transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: configFile.adminEmail,
                    pass: configFile.adminPassword
                }
            })

            var mailOptions = {
                from: configFile.adminEmail,
                to:  userEmail,
                subject: 'Eshopper Order Confirmation',
                html: `Hello ${result.firstName} <p>Your Order Is Confirmed.</p>
                        <h4>Thank You</h4><h4>Admin: Himanshu</h4>`,
            };

            transport.sendMail(mailOptions,function(error,info){
                if(error){
                    console.log(error);
                } else {
                    console.log("Email has been sent successfully");
                }
            })

            res.status(200).json({ message : "Email has been sent successfully"});       
        }
    })
}

 exports.postProfile = async (req,res) => {
    var name =req.body.name;
    // console.log(req.file);
    const imagePath = "http://localhost:3000/public/uploads/"+name; //Set Path Dynamically
    const profile = new Profile({
        name,
        imagePath
    });
    const createdProfile = await profile.save();
    res.status(201).json({ message : "File Uploaded Successfully"});

};
 

// Send A Mail 
exports.send_mail = (req,res) => {

    var transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'himanshurawat155@gmail.com',
            pass: '8171630747Hr@'
        }
    });
    
    var mailOptions = {
        from: req.body.email,
        to: 'himanshurawat155@gmail.com',
        subject: req.body.subject,
        text: req.body.message,
    };
    
    transport.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        } else {
            console.log("Email has been sent successfully");
        }
    })
    res.status(200).json({ message : "Email Sent"});   
 }