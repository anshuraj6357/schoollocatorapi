const express=require('express')
const {createSchool,getAllSchoolBydistance,updateSchools}= require("../controller/school")
const {userValidate}=require('../middleware/userValidate');

const router =express.Router()

//create school router 
router.post('/create-school',userValidate,createSchool)

//update school router
router.post('/update-school',userValidate,updateSchools)

//get all school router 

router.post('/all-school',getAllSchoolBydistance)





module.exports=router