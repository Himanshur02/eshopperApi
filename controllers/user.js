// Import User Schema Model
var db_user = require('../model/userModel');
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var configFile = require("../config/config.json");

// Get A Particular User 
exports.get_user = (req,res) => {
   db_user.find( { _id : req.params.id },(err,result)=>{
       if(err) {
           res.json({
               success :false,
               status : 404,
               message : "User Not Found"
           });
       } else {
           res.json(result[0]);
       }
   });
}

// Forget Password For User 
exports.forget_password = (req,res) => { 
   var newPassword = bcrypt.hashSync(req.body.password,10);   
   db_user.findOneAndUpdate({_id : req.params.id },{ $set : { password: newPassword } }, {new:true},(err,result)=> {
   if(err) {
           res.json({
               success :false,
               status : 404,
               message : "User Not Found"
           });
       }   else {           
           res.json(
               {
                  success :true,
                  status : 200,
                  message : "Password Changed Successfully"
               });
       }
   })
}

// Search User By Email
exports.search_email = (req,res) => {
   const email = req.body.email;
   db_user.find({email : email},(err,result)=>{
    if(err) {
        res.json({
            success :false,
            status : 404,
            message : "User Not Found"
        });
    } else {
        res.json(result[0]);
    }
   }).catch(err=>{
       res.send(err);
   });
}

// Change Password For User
exports.change_password = (req,res) => {
    var currentPassword = req.body.currentPassword;   
    var newPassword = bcrypt.hashSync(req.body.newPassword,10);
         db_user.findOne({_id:req.params.id}).exec()
            .then(result => {
               if(result){                  
                  bcrypt.compare(currentPassword,result.password,(err,isMatch) =>{
                     if(isMatch){                               
                         db_user.findOneAndUpdate({_id : req.params.id },{ $set : { password: newPassword } }, {new:true},(err,result)=> {
                           if(err) {
                              res.json({
                                success :false,
                                status : 404,
                                message : "User Not Found"
                                });
                                } else {       
                                    res.json({
                                        success :true,
                                        status : 200,
                                        message : "Password Changed Successfully"
                                       });
                                    }
                                 })
                            }   
                            else
                            res.json({
                                success :false,
                                status : 401,
                                message : 'Inavalid Current Password!'                               
                            });                                                                                       
                        });    
                    } else{
                        res.json({
                            success: false,
                            status : 401,
                            message:'Invalid User!'
                        });
                    }
                })
                .catch(err => {
                    res.send(err);
                })

}

// Upload Image
exports.upload_img = (req,res) => {
    db_user.findOneAndUpdate({_id : req.params.id}, {$set: {"picName" : req.body.name}},{new:true}),(err,result)=>{
        if(err) {
            res.json({
                success :false,
                status : 404,
                message : "User Not Found"
            });
        } else {
            res.json(result[0]);
        }
    };
 }

 //Get All Users Data
exports.get_users = (req,res) => {
    db_user.find({},(err,result)=>{
        if(err) {
            res.json({
                status : 404,
                message : "User Not Found"
            });
        } else {
            res.status(200).json(result);
        }
    });
};

// Update User
exports.update_user = (req,res) => {
    var updateData =  req.body;
    db_user.findOneAndUpdate({_id : req.params.id }, updateData, {new:true},(err,result)=> {
    if(err) {
            res.json({
                status : 404,
                message : "User Not Found"
            });
        }   else {
            res.status(200).json("User Updated Successfully");
        }
    });
}

// Delete User
exports.delete_user = (req,res) => {
    db_user.findByIdAndRemove({_id : req.params.id },(err,result)=> {
    if(result) {
        res.status(200).json("User Deleted Successfully");
        }   else {
            res.status(404).json("User Not Found");      
        }
    })
}