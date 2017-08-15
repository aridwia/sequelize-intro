'use strict'

const express = require('express');
const app = express();
var router = express.Router();
const Models = require('../models')

router.get('/',(req,res) => {
  res.render('login',{ })
  // res.send("tes")
})

router.post('/login', function(req, res, next) {
  let username = req.body.username
  let password = req.body.password

  Models.User.find({
    where: {username: username}
  })
  .then(user=> {
    if(user.password == password) {
      req.session.user = {
        username : username,
        role: user.role
      }
      res.redirect("/dashboard")
    } else {
      res.send('Maaf password salah')
    }
  })
  .catch(err => {
    res.redirect('/login')
  })
})

router.get('/logout',(req,res) => {
  req.session.destroy()
  res.render('login',{ })
  // res.send("tes")
})



module.exports = router;
