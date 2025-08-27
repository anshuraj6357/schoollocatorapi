const express=require('express');

const{userSignup,userLogin,userUpdated}=require('../controller/user')
const { userValidate } = require('../middleware/uservalidate');

const router =express.Router();

//create user
router.post('/create-user',userSignup)

//login user 
router.post('/login-user',userLogin)


//update user
router.post('/update-user/:id',userValidate,userUpdated)



module.exports=router