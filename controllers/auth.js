// Importing Modules
var users = require('../model/userModel');
var admins = require('../model/adminModel');
var configFile = require("../config/config.json");
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

// Import Config File
var  configFile = require("../config/config.json");

 // Login User
 exports.login = (req,res) =>{
    const email = req.body.email;
    const password = req.body.password;
                users.findOne({email:email}).exec()
                .then(result => {
                     if(result){                           
                        bcrypt.compare(password,result.password,(err,isMatch) =>{
                            if(isMatch){  
                            var token = jwt.sign({email:email,password:password},configFile.secret,{expiresIn: 60 * 60});                             
                            res.json({
                                success :true,
                                status : 200,
                                message : 'Login Successfully!',                        
                                result : {
                                    id : result._id,
                                    firstName : result.firstName,
                                    lastName : result.lastName,
                                    email : result.email,
                                    token : token
                                }                               
                            });
                            }   
                            else
                            res.json({
                                success :false,
                                status : 401,
                                message : 'Inavalid Password!'                               
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
                    console.log(err);
                    return;
                });
    }

// User Registration
exports.register = (req,res) =>{
    let user = users();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.password = bcrypt.hashSync(req.body.password,10);  
    user.role = req.body.role;
    user.image = req.body.image;
    user.phone = parseInt(req.body.phone);
    user.address = req.body.address;
    user.city = req.body.city;
    user.state = req.body.state;
    user.country = req.body.country;
    user.zip = parseInt(req.body.zip);
    user.save((err,result)=>{
        if(err) {
            res.json(err);
        } else {
            var transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'himanshurawat155@gmail.com',
                    pass: '8171630747Hr@'
                }
            });

            var mailOptions = {
                from: 'himanshurawat155@gmail.com',
                to: result.email ,
                subject: "eShopper",
                html: `Welcome ${result.firstName} To eShopper.<br/> Thank you for registration.<br/>
                      <br/><p>Admin: Himanshu</p>`,
            };
            
            transport.sendMail(mailOptions,function(error,info){
                if(error){
                    console.log(error);
                } else {
                    console.log("Email has been sent successfully");
                }
            })

            res.json({
                success:true,
                status:200,
                message: 'User registered successfully',
                result :{
                firstName:result.firstName,
                lastName:result.lastName,
                email: result.email
                }
                });
            }
        });
    }

  // Verify token
  exports.checkAuth = (req,res,next) => {
    const token = req.header('token');
    if(!token) return res.json({
        success: false,
        status : 401,
        message:'Access Denied!'
    });           
    try {
        const verified = jwt.verify(token,configFile.secret);
        req.user = verified;
        next();

    }catch(err) {
        res.json({
            success: false,
            status : 400,
            message:'Invalid Token'
        });

    }
}

//Admin Login 
exports.admin_login = (req,res) =>{
    const email = req.body.email;
    const password = req.body.password;
                admins.findOne({email:email})
                .then(result => {
                     if(result){                           
                        bcrypt.compare(password,result.password,(err,isMatch) =>{
                            if(isMatch){  
                            var token = jwt.sign({email:email,password:password},configFile.secret,{expiresIn: 60 * 60});                             
                            res.json({
                                success :true,
                                status : 200,
                                message : 'Admin Login Successfully!',                        
                                result : {
                                    id : result._id,
                                    firstName : result.firstName,
                                    lastName : result.lastName,
                                    email : result.email,
                                    phone : result.phone,
                                    token : token
                                }                               
                            });
                            }   
                            else
                            res.json({
                                success :false,
                                status : 401,
                                message : 'Inavalid Password!'                               
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
                    console.log(err);
                    return;
                });
    }

// Register Admin
exports.admin_register = (req,res) =>{
    let admin = admins();
    admin.firstName = req.body.firstName;
    admin.lastName = req.body.lastName;
    admin.email = req.body.email;
    admin.phone = parseInt(req.body.phone);
    admin.password = bcrypt.hashSync(req.body.password,10);   
    admin.save((err,result)=>{
        if(err) {
            res.json(err);
        } else {
            res.json({
                success:true,
                status:200,
                message: 'User registered successfully',
                result :{
                firstName:result.firstName,
                lastName:result.lastName,
                email: result.email,
                phone: result.phone
                }
                });
            }
        });
    }


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
    res.status(200).json({ message : "Email has been sent successfully"});   
 }