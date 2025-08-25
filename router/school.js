const express=require('express')
const {createSchool,getAllSchoolBydistance}= require("../controller/school")

const router =express.Router()


router.post('/create-school',createSchool)

router.get('/all-school',getAllSchoolBydistance)





module.exports=router