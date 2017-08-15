var express = require('express')
var router = express.Router()

const Models = require('../models')

router.get('/', function(req, res, next) {
  res.render('login', {pageTitle: 'Login Page'})
})

module.exports = router;
