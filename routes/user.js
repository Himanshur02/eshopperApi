// All Services For Users APi
var Services = require('../controllers/user');
var AdminServices = require('../controllers/auth');
var admin = require('../controllers/admin');
var auth = require('../controllers/auth').checkAuth;

const storage = require('./file');

module.exports = function (router) {
   
//  Search email For forget Password
 router.post("/api/search",(req,res) =>{
    Services.search_email(req,res);   
    });

// Get A Particular User 
router.get("/api/user/:id",(req,res) =>{
    Services.get_user(req,res);   
    });

// Change Forget Password Of User 
router.put("/api/forgetPassword/:id",(req,res) =>{
    Services.forget_password(req,res);   
    });

// Change Password Of User 
router.put("/api/changePassword/:id",(req,res) =>{
    Services.change_password(req,res);   
    });

// Check Token To login In
router.get("/api/auth/login",auth,(req,res) => {
    res.json("Token Verified");
    }); 

// Upload Image Of User 
router.put("/api/image/:id",(req,res) =>{
    Services.upload_img(req,res);   
    });

// Get All Users In The Database
router.get("/api/users",(req,res) =>{
    Services.get_users(req,res);   
    });

// Update User Into The Database 
router.put("/api/update/:id",(req,res) =>{
    Services.update_user(req,res);   
    });

// Delete User From The Database 
router.delete("/api/delete/:id",(req,res) =>{
    Services.delete_user(req,res);   
    }); 

// Register A New Admin
router.post("/api/admin/register",(req,res) =>{
    AdminServices.admin_register(req,res);
    });

// Login Admin 
router.post("/api/admin/login",(req,res) =>{
    AdminServices.admin_login(req,res);   
    });
    
// File Upload
router.post('/api/admin/upload',storage,(req,res) =>{
    admin.postProfile(req,res);   
    });
    
// Get All Categories List 
router.get("/api/admin/categories/:pageNumber",(req,res) =>{
    admin.get_category(req,res);   
    });

// Send Mail Via Admin
router.post('/api/admin/mail',(req,res) =>{
    admin.send_mail(req,res);   
    });

// Add Category
router.post('/api/admin/addCategory',(req,res) =>{
    admin.add_Category(req,res);   
    });
    
// Delete Category
router.delete('/api/admin/delete/category/:id',(req,res) =>{
    admin.delete_category(req,res);   
    });

// Update Category
router.put('/api/admin/update/category/:id',(req,res) =>{
    admin.update_category(req,res);   
    });

// Get A Particular Category 
router.get("/api/admin/category/:id",(req,res) =>{
    admin.get_categoryById(req,res);   
    });

// Searching Category 
router.post("/api/admin/search/category",(req,res) =>{
    admin.search_category(req,res);   
    });

// Add Product
router.post('/api/admin/addProduct',(req,res) =>{
   admin.add_product(req,res);   
    });

// Get All Products
router.get('/api/admin/products/:pageNumber',(req,res) =>{
    admin.get_products(req,res);   
     });

// Get All Products Count
router.get('/api/admin/count/products/:categoryName',(req,res) =>{
    admin.get_productCount(req,res);   
    });

// Count Products By Category
router.get('/api/admin/products/category/:categoryName',(req,res) =>{
    admin.get_productsByCategory(req,res);   
    });

// Get All Products By Category
router.get('/api/admin/show/category/:categoryName/:pageNumber',(req,res) =>{
    admin.get_productsByCategoryName(req,res);   
    });
    

// Get A Particular Product 
router.get("/api/admin/product/:id",(req,res) =>{
    admin.get_productById(req,res);   
    });

// Delete Product
router.delete('/api/admin/delete/product/:id',(req,res) =>{
    admin.delete_product(req,res);   
    });

// Update Category
router.put('/api/admin/update/product/:id',(req,res) =>{
    admin.update_product(req,res);   
    });
   
// Searching Category 
router.post("/api/admin/search/product",(req,res) =>{
    admin.search_product(req,res);   
    }); 
    
// Searching Category 
router.get("/api/admin/addToCart/:id",(req,res) =>{
    admin.add_To_cart(req,res);   
    }); 

// Get All Cart Items
router.get('/api/admin/cartItems',(req,res) =>{
    admin.get_cart_items(req,res);   
     });

// Total Price In Cart
router.get('/api/user/total/cartItems',(req,res) =>{
    admin.get_totalprice(req,res);   
     });     
     
// Delete Product
router.delete('/api/admin/delete/item/:id',(req,res) =>{
    admin.delete_itemInCart(req,res);   
    });

// Send Mail For Confirmed Orders
router.get('/api/admin/sendMail/:id',(req,res) =>{
    admin.confirmOrder_Mail(req,res);   
     });    
    

}

