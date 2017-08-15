'use strict'

const express = require('express');
const app = express();
var router = express.Router();
var model = require('../models');
const userauth = require('../helpers/userauth.js');

router.use((req,res, next)=>{
  if(req.session.user.role == 'headmaster' || req.session.user.role == 'teacher' || req.session.user.role == 'academic'){
     next();
  } else {
    res.send('Maaf anda tidak diizinkan mengakses halaman ini');
  }
})

router.get('/',(req,res) => {
  model.Student.findAll({
    order: [['first_name', 'ASC']]
  })
    .then(data => {
      let userSession = req.session.user
      let getUserAuth = userauth.userRole(userSession.role)
      res.render('students',{stddata:data})
    })
})

router.get('/addstudent',(req,res) =>{
  let userSession = req.session.user
  let getUserAuth = userauth.userRole(userSession.role)
  res.render('addstudent',{errmsg: ''})
})

router.post('/', function(req, res){
   model.Student.findOne({
      where:{
       email:req.body.email
      }
    })
  .then(function(result){
    // console.log(result);
    if(!result){
      model.Student.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
      })
      .then(function(){
        res.redirect('/students')
      })
      .catch(function(err){
       res.render('addstudent', {errmsg: err.message});
      })
    } else {
      res.render('addstudent', {errmsg: 'Email telah terdaftar'});
     }
    })
  })


router.get('/editstudent/:id',(req,res) => {
  model.Student.findById(req.params.id)
    .then((databyid) => {
      res.render('editstudent',{data:databyid})
    })
  // res.send('tes')
})


router.post('/editstudent/:id', (req, res) => {
  model.Student.findOne({
    where:{
     email: req.body.email
    }
  })
.then(function(result){
  let userSession = req.session.user
  let getUserAuth = userauth.userRole(userSession.role)
  if(!result || req.body.email === req.body.emailOri){
   model.Student.update({
     first_name: req.body.first_name,
     last_name: req.body.last_name,
     email: req.body.email,
     },{
     where:{
       id:req.params.id
     }
   })
   .then(function(){
     res.redirect('/students');
   })
   .catch(function(err){
     model.Student.findById(req.params.id)
     .then(function(rows){
       res.render('editstudent',{data:rows, errmsg: err})
     })
   })
 } else {
   res.send('email sudah terpakai')
 }
})
})


router.get('/delete/:id', (req, res) => {
   var id = req.params.id;
   model.Student.destroy({
     where: { id: id }
   })
   .then(function(data) {
       res.redirect('/students')
   })
   .catch(function(error) {
       console.log(error)
   })
})

router.get('/editstudent/:id/addsubjectstudent', function(req, res){
  model.Student.findById(req.params.id,{
    include: [model.Subject]
  })
  .then(function(rows){
    model.Subject.findAll()
    .then(function(dataSubject){
      console.log(rows);
      let userSession = req.session.user
      let getUserAuth = userauth.userRole(userSession.role)
      res.render('addsubjectstudent', {data:rows, data2: dataSubject})
    })
  })
  .catch(function(error) {
      console.log(error)
  })
})

router.post('/editstudent/:id/addsubjectstudent', function(req, res) {
  model.StudentSubject.create({
    StudentId: req.params.id,
    SubjectId: req.body.selectSubject
  }, {
    where : {
      id:req.params.id
    }
  })
  .then(function() {
    res.redirect('/students')
  })
  .catch(err => {
    console.log(err);
  })
})


module.exports = router;




// router.post('/editstudent/:id',(req,res) => {
//   var id = req.params.id
//   model.Student.update({
//     first_name : req.body.first_name,
//     last_name : req.body.last_name,
//     email : req.body.email
//   }.where{id : id})
//     .then(data => {
//       res.redirect('/students')
//     })
//     .catch(error => {
//       console.log(error);
//     })
// })
// router.post('/editstudent/:id',(req,res) => {
//   model.Stundent.update({
//     first_name : req.body.first_name,
//     last_name : req.body.last_name,
//     email : req.body.email
//   }, {
//     where: { id: req.params.id },
//     returning: true,
//     plain: true
//   })
//   .then(function (result) {
//     console.log(result);
//     res.redirect('/students')
  // result = [x] or [x, y]
  // [x] if you're not using Postgres
  // [x, y] if you are using Postgres
//   })
// })





//   res.redirect('/students')
// })
