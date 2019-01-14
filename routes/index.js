let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Student = require('../model/register')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// API for register page
router.get('/register', (req, res, next)=>{
  res.render('register')
})

// API for browse page
router.get('/browse', (req, res, next)=>{
  Student.find().then(result=>{
   res.status(200).render('browse', {
     students: result
   })
  }).catch(err=>{
    res.status(500).render('error',{
      error:err
    })
  })
})

// API for getting each student
router.get('/browse/:id', (req, res, next)=>{
  let id = req.params.id

  Student.findById(id).exec().then(result=>{
    res.status(201).render('oneStudent', {
      student: result
    })
  }).catch(err=>{
    res.status(500).render('error',{
      error:err
    })
  })
})

// API for register POST request
router.post('/register', (req, res, next)=>{
  let student = new Student({
    name: req.body.name,
    matric: req.body.matric,
    school: req.body.school,
    email: req.body.email,
    department: req.body.department,
    supervisor: req.body.supervisor,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  });

  student.save().then(result=>{
    res.status(201).redirect('/register');
  }).catch(err=>{
    res.status(500).redirect('/error', {
      error: err
    })
  })

})

// API for get student details for update
router.get('/browse/edit/:id', (req, res, next)=>{
  let id = req.params.id

  Student.findById(id).exec().then(result=>{
    res.status(201).render('update', {
      student: result
    })
  }).catch(err=>{
    res.status(500).render('error',{
      error:err
    })
  })
})

// API for Edit student details
router.post('/browse/edit/:id', (req, res, next)=>{
  let id = req.params.id;
  const updateOps = {};
    for(let ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
  
  Student.findByIdAndUpdate(id, { $set : updateOps }).then(result=>{
    res.status(201).redirect('/update');
  }).catch(err=>{
    res.status(500).redirect('/error', {
      error: err
    })
  })
 
})

router.delete('/', (req, res, next)=>{
  
})
module.exports = router;
