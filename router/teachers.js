'use strict'

const express = require('express');
const app = express();
var router = express.Router();
const model = require('../models');

router.get('/',(req,res) => {
  model.Teacher.findAll()
    .then(data => {
      res.render('teachers',{data:data})
    })
})

router.get('/addteacher',(req,res) =>{
  res.render('addteacher',{})
})

router.post('/',(req,res) => {
  model.Teacher.create({
    first_name : req.body.firstname,
    last_name : req.body.lastname,
    email : req.body.email
  })
    .then(function(data) {
        res.redirect('/teachers')
    })
    .catch(function(error) {
        console.log(error)
    })
  })

router.get('/editteacher/:id',(req,res) => {
  model.Teacher.findById(req.params.id)
    .then((databyid) => {
      res.render('editteacher',{data:databyid})
    })
  // res.send('tes')
})

router.post('/editteacher/:id', (req, res) => {
  model.Teacher.findOne({
    where:{
     email: req.body.email
    }
  })
.then(function(result){
 // if(!result || req.body.email === req.body.emailOri){
   model.Teacher.update({
     first_name: req.body.first_name,
     last_name: req.body.last_name,
     email: req.body.email,
     },{
     where:{
       id:req.params.id
     }
   })
   .then(function(){
     res.redirect('/teachers');
   })
   .catch(function(err){
     model.Student.findById(req.params.id)
     .then(function(rows){
       res.render('editteacher',{data:rows, errmsg: err})
     })
   })
 // } else {
 //   res.send('email sudah di gunakan')

  })
})

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
