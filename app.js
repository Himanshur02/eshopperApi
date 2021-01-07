// Routes In Express
var express = require('express');
const mongoose = require("mongoose");
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var cors = require('cors');
var fileupload = require('express-fileupload');

const storage = require('./routes/file');


// User Controllers
var Services = require('./controllers/auth');

// Database Config File
const configFile = require("./config/config.json");

// Express FileUpload Middleware
app.use(fileupload());

// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));
app.use(cors());

// // Database Connection
const db_url = configFile.connect_db;
mongoose.connect(db_url, {useUnifiedTopology : true , useNewUrlParser : true, useFindAndModify : false});

const db = mongoose.connection;
db.once("open", () =>{
    console.log("MongoDB database connected!");
});

require('dotenv').config();

var port = process.env.PORT;
var host = process.env.HOST;

// Set ejs View Engine
app.set('view engine', 'ejs');

// Set Router Middleware
app.use('/',router);

// Set ejs View Engine
app.set('view engine', 'ejs');

//Static Middleware
router.use('/',express.static(__dirname+"/public/uploads"));

// View Engine
router.get('/',(req,res)=>{
    res.render("index");
})

// Register A New User
router.post("/api/user/register",storage,(req,res) =>{
    Services.register(req,res);
    });

// Login User
router.post("/api/user/login",(req,res) =>{
    Services.login(req,res);   
    });

// Go To User Routes For All Routes Api
require('./routes/user')(router);

//For Wrong Routes
app.all('*',(req,res)=>{	 
    res.json({
        success :false,
        status : 404,
        message : 'OOPs Wrong URL!' 
    });
});

// Server Running On Port : 3000
app.listen(port,host,()=>{
    console.log(`Server running at http://${host}:${port}`);
});
