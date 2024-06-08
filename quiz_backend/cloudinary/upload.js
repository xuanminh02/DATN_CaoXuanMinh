import { v2 as cloudinary } from "cloudinary"
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary"
import config from "./config.js"

config
const storage= new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png'],
    filename: function (req, file, cb) {
        cb(null, file.originalname); 
    }
})

const uploadCloud= multer({storage})

export default uploadCloud