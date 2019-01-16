let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Student = require('../model/register');
let studentController = require('../controller/index')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// API for register page
router.get('/register', (req, res, next)=>{
  res.render('register')
})

// API for browse page
router.get('/browse', studentController.get_students_get)

// API for getting each student
router.get('/browse/:id', studentController.get_all_student_get)

// API for register POST request
router.post('/register', studentController.get_register_get)

// API for get student details for update
router.get('/browse/edit/:id', studentController.get_view_each_student_get)

// API for Edit student details
router.post('/browse/edit/:id', studentController.get_update_student_get)

router.delete('/browse/delete/:id', studentController.get_delete_student_get)
module.exports = router;
