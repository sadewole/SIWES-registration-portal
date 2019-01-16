let mongoose = require('mongoose');
let Student = require('../model/register');

exports.get_students_get = (req, res, next)=>{
    Student.find().then(result=>{
     res.status(200).render('browse', {
       students: result
     })
    }).catch(err=>{
      res.status(500).render('error',{
        error:err
      })
    })
}

exports.get_all_student_get = (req, res, next)=>{
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
}

exports.get_register_get = (req, res, next)=>{
    req.check('name', 'Name is required').notEmpty()
    req.check('email', 'Email is required').notEmpty()
    req.check('email', 'Invalid email address').isEmail()
    req.check('matric', 'Matric number is required').notEmpty()
    req.check('school', 'School name is required').notEmpty()
    req.check('department', 'Department is required').notEmpty()
    req.check('supervisor', 'Supervisor name is required').notEmpty()
    req.check('startDate', 'Start date is required').notEmpty()
    req.check('endDate', 'End date is required').notEmpty()
    
    let errors = req.validationErrors()
  
    if (errors){
      res.render('register', {
        errors: errors
      })
    }else{
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
        res.status(201).render('register', {
          success: "Student details added"
        });
      }).catch(err=>{
        res.status(500).render('error', {
          error: err
        })
      })
    }
}

exports.get_view_each_student_get = (req, res, next)=>{
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
  }

exports.get_update_student_get = (req, res, next)=>{
    let id = {_id: req.params.id};
    const updateOps = {
      name: req.body.name,
      matric: req.body.matric,
      school: req.body.school,
      email: req.body.email,
      department: req.body.department,
      supervisor: req.body.supervisor,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    };
  
    Student.findByIdAndUpdate(id, updateOps).then(result=>{
      res.status(201).redirect('/browse');
    }).catch(err=>{
      res.status(500).redirect('/error', {
        error: err
      })
    })
   
  }

  exports.get_delete_student_get = (req, res, next)=>{
    let id = {_id: req.params.id};
  
    Student.remove(id).then(result=>{
      res.send('success')
    }).catch(err=>{
      res.status(500).redirect("/error",{
        error: err
      })
    })
  }