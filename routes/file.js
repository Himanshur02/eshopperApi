const multer = require('multer');
var path = require('path');

const diskStorage = multer.diskStorage(
    {
        destination : (req,file,cb)=>{
            cb(null, './public/uploads');
        },
        filename: (req,file,cb)=>{
            const mimeType = file.mimetype.split('/');
            // const fileType = mimeType[1];
            const fileName = file.originalname;
            cb(null, fileName)
        }
    }
)

// Check FileType 
function checkFileType(file,cb){
    // Allowed File Extention
    const fileTypes = /jpeg|jpg|png|gif/;
    // Check File Extention
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    // Check MIME Type
    const mimetype = fileTypes.test(file.mimetype);

    if( mimetype && extname ){
        return cb(null,true);

    } else {
        cb('Error: Images Only!');
    }
}


const storage = multer({storage : diskStorage}).single('image')

module.exports = storage;


