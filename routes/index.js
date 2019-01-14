let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Student = require('../model/register')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/register', (req, res, next)=>{
  res.render('register')
})
router.get('/browse', (req, res, next)=>{
  Student.find().exec().then(result=>{
    res.status(200).render('/browse');
  }).catch(err=>{
    res.status(500).redirect('/error', {
      error: err
    })
  })
})
router.post('/register', (req, res, next)=>{
  let student = new Student({
    name: req.body.name,
    matric: req.body.matric,
    school: req.body.school,
    email: req.body.email,
    department: req.body.department,
    supervisor: req.body.supervisor,
    startDate: req.body.startDate,
    enddate: req.body.enddate
  });

  student.save().then(result=>{
    res.status(201).redirect('/register');
  }).catch(err=>{
    res.status(500).redirect('/error', {
      error: err
    })
  })

})
router.delete('/', (req, res, next)=>{
  
})
module.exports = router;
