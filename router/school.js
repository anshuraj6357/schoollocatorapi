const express = require('express');
const router = express.Router();

// Import controller functions
const { createSchool, getAllSchoolBydistance, updateSchools } = require('../controller/school');

// Import middleware
const { userValidate } = require ('../middleware/uservalidate');

// ------------------------
// Routes
// ------------------------

// Create a new school (Authenticated)
router.post('/create-school', userValidate, createSchool);

// Update an existing school (Authenticated)
router.post('/update-school', userValidate, updateSchools);

// Get all schools sorted by distance (Public)
router.get('/all-school', getAllSchoolBydistance);

module.exports = router;
