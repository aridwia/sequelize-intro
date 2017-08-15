'use strict'

const express = require('express');
const app = express();
var router = express.Router();
const model = require('../models');
const userauth = require('../helpers/userauth.js');

router.use((req,res, next)=>{
  if(req.session.user.role == 'academic' || req.session.user.role == 'headmaster'){
     next();
  } else {
    res.send('Maaf anda tidak diizinkan mengakses halaman ini');
  }
})

router.get('/',(req,res) => {
  model.Subject.findAll({
    order: [['subject_name', 'ASC']],
    include: [model.Teacher]
  })
  .then(data => {
    let userSession = req.session.user
    let getUserAuth = userauth.userRole(userSession.role)
    // console.log(data.Teachers[0].id);
    res.render('subjects', {dataSubject: data});
  })
})

// model.Subject.findAll().then(data => {
//       res.render('subjects',{sbjdata:data})
//     })
// })


router.get('/addsubject',(req,res) => {
  let userSession = req.session.user
 let getUserAuth = userauth.userRole(userSession.role)
  res.render('addsubject',{errmsg:""})
})

router.post('/',(req,res) => {
  model.Subject.create({
    subject_name : req.body.subject_name
  })
  .then(function(data) {
      res.redirect('/subjects')
  })
  .catch(function(error) {
      console.log(error)
  })
})


router.get('/editsubject/:id',(req,res) => {
  model.Subject.findById(req.params.id)
    .then((databyid) => {
      let userSession = req.session.user
      let getUserAuth = userauth.userRole(userSession.role)
      res.render('editsubject',{data:databyid})
    })
  // res.send('tes')
})

router.post('/editsubject/:id', (req, res) => {
   model.Subject.update({
     subject_name: req.body.subject_name,
     },{
     where:{
       id:req.params.id
     }
   })
   .then(function(){
     res.redirect('/subjects');
   })
 // } else {
 //   res.send('email sudah di gunakan')

})


router.get('/delete/:id', (req, res) => {
   var id = req.params.id;
   model.Subject.destroy({
     where: { id: id }
   })
   .then(function(data) {
       res.redirect('/teachers')
   })
   .catch(function(error) {
       console.log(error)
   })
 })

 router.get('/:id/enrolledstudents', function (req, res) {
   model.StudentSubject.findAll({
     where: {
       SubjectId: req.params.id
     },
     include: [{all:true}],
     order: [['Student', 'first_name', 'ASC']],
   })
   .then(data => {
    //  console.log(data);
    let userSession = req.session.user
  let getUserAuth = userauth.userRole(userSession.role)
     res.render('subject-enrolledstudents', {dataSubject: data});
   })
 })

 router.get('/:id/:ids/givescore', function (req, res) {
    model.Student.findAll({
      where: {
        id: req.params.id
      }
    })
    .then(datasiswa => {
      model.Subject.findAll({
        where: {
          id: req.params.ids
        }
      })
      .then(datasubject => {
        let userSession = req.session.user
      let getUserAuth = userauth.userRole(userSession.role)
        res.render('subject-givescore', {data: datasiswa, dataSubject: datasubject})
      })
    })
  })

  router.post('/:id/:ids/givescore', function (req, res) {
    model.StudentSubject.update({
      Score: req.body.score,
    },{
      where: {
        StudentId: req.params.id,
        $and: {
          SubjectId: req.params.ids
        }
      }
    })
    .then(result => {
      res.redirect('/subjects')
    })
  })


module.exports = router;
