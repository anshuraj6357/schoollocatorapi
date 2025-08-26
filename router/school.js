const express=require('express')
const {createSchool,getAllSchoolBydistance,updateSchools}= require("../controller/school")
const {userValidate}=require('../middleware/userValidate');

const router =express.Router()


router.post('/create-school',userValidate,createSchool)
router.post('/update-school/:id',userValidate,updateSchools)

router.post('/all-school',getAllSchoolBydistance)





module.exports=router