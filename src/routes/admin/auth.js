const express = require('express');
const { adminMiddleware } = require('../../commonMiddlewares');
const { signup , signin, requiredSignIn } = require('../../controller/admin/auth');
const { validateSignupRequest, isrequestValidated } = require('../../validators/auth');
const router = express.Router();


router.post('/admin/signup', validateSignupRequest , isrequestValidated , signup);

router.post('/admin/signin', signin);

router.get('/admin/profile',requiredSignIn , adminMiddleware , (req , res)=>{
    res.status(200).json({
        message : "profile view"
    })
})



module.exports= router;