'use strict'

const express = require('express');
const app = express();
var router = express.Router();

router.get('/',(req,res) => {
  res.render('index',{ })
  // res.send("tes")
})

module.exports = router;
