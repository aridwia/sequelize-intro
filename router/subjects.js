'use strict'

const express = require('express');
const app = express();
var router = express.Router();
const model = require('../models');

router.get('/',(req,res) => {
  model.Subject.findAll({
    order: [['subject_name', 'ASC']],
    include: [model.Teacher]
  })
  .then(data => {
    // console.log(data.Teachers[0].id);
    res.render('subjects', {dataSubject: data});
  })
})

// model.Subject.findAll().then(data => {
//       res.render('subjects',{sbjdata:data})
//     })
// })


router.get('/addsubject',(req,res) => {
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


module.exports = router;
