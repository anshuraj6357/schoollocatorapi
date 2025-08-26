const express=require('express');


const{userSignup,userLogin,userUpdated}=require('../controller/user')
const {userValidate}=require('../middleware/userValidate');

const router =express.Router();


router.post('/create-user',userSignup)
router.post('/login-user',userLogin)
router.post('/update-user/:id',userValidate,userUpdated)

module.exports=router