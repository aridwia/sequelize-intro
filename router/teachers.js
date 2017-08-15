'use strict'

const express = require('express');
const app = express();
var router = express.Router();
const model = require('../models');
const userauth = require('../helpers/userauth.js');

router.use((req,res, next)=>{
  if(req.session.user.role == 'headmaster'){
     next();
  } else {
    res.send('Maaf anda tidak diizinkan mengakses halaman ini');
  }
})

router.get('/',(req,res) => {
  model.Teacher.findAll({
    order: [['first_name','ASC']],
    include: [model.Subject]
  })
    .then(data => {
      let userSession = req.session.user
      let getUserAuth = userauth.userRole(userSession.role)
      res.render('teachers',{data:data})
    })
})

router.get('/addteacher',(req,res) =>{
  res.render('addteacher',{errmsg:""})
})

router.post('/',(req,res) => {
  model.Student.findOne({
     where:{
      email:req.body.email
     }
   })
 .then(function(result){
  if (!result){
  model.Teacher.create({
    first_name : req.body.firstname,
    last_name : req.body.lastname,
    email : req.body.email,
    // SubjectId : req.body.SubjectId
  })
    .then(function() {
        res.redirect('/teachers')
    })
    .catch(function(err) {
      res.render('addteacher', {errmsg: err.message});
    })
  }else {
    res.render('addteacher',{errmsg: 'Email telah terdaftar'})
  }
  })
})

router.get('/editteacher/:id',(req,res) => {
  model.Teacher.findById(req.params.id, {include: [model.Subject]})
  .then(function(rows) {
    model.Subject.findAll()
    .then(dataSemua => {
      let userSession = req.session.user
      let getUserAuth = userauth.userRole(userSession.role)
      res.render('editteacher',{data:rows, data2: dataSemua})
    })
  })
 })
//**sebelum association
//   model.Teacher.findById(req.params.id)
//     .then((databyid) => {
//       res.render('editteacher',{data:databyid})
//     })
//   // res.send('tes')
// })

router.post('/editteacher/:id', (req, res) => {
  model.Teacher.update({
      first_name : req.body.first_name,
      last_name : req.body.last_name,
      email : req.body.email,
      SubjectId : req.body.subject || null
    }, {
      where : {
        id:req.params.id
      }
    })
    .then(function() {
      res.redirect('/teachers')
    })
    .catch(err => {
      console.log(err);
    })
  })


//**** sebelum asosiasi
//   model.Teacher.findOne({
//     where:{
//      email: req.body.email
//     }
//   })
// .then(function(result){
//  // if(!result || req.body.email === req.body.emailOri){
//    model.Teacher.update({
//      first_name: req.body.first_name,
//      last_name: req.body.last_name,
//      email: req.body.email,
//      },{
//      where:{
//        id:req.params.id
//      }
//    })
//    .then(function(){
//      res.redirect('/teachers');
//    })
//    .catch(function(err){
//      model.Student.findById(req.params.id)
//      .then(function(rows){
//        res.render('editteacher',{data:rows, errmsg: err})
//      })
//    })
//  // } else {
//  //   res.send('email sudah di gunakan')
//
//   })
// })

router.get('/delete/:id', (req, res) => {
   var id = req.params.id;
   model.Teacher.destroy({
     where: { id: id }
   })
   .then(function(data) {
       res.redirect('/teachers')
   })
   .catch(function(error) {
       console.log(error)
   })
 })





module.exports = router;
