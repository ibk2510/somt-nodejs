const express = require('express');
const { createProduct, getAllproducts, deleteOneitem } = require('../controller/product');
const router = express.Router();
const path = require('path');

const multer = require('multer');
const shortid = require('shortid');
const { requiredSignIn, adminMiddleware } = require('../commonMiddlewares');

const storage = multer.diskStorage({
    destination : function (req , res, cb){
        cb(null , path.join(path.dirname(__dirname), 'uploads'))
    },
    filename : function (req , file , cb) {
        cb(null , shortid.generate()+ '-' + file.originalname)
    }
})
const upload = multer({storage})
router.post('/product/create', requiredSignIn, adminMiddleware , upload.array('images') ,createProduct);
//admin route
router.get('/products/getall', getAllproducts);
router.delete('/product/delete' ,requiredSignIn , adminMiddleware, deleteOneitem);
module.exports = router;