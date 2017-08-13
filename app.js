'use strict'

const express = require('express');
const app = express();
var index = require('./router/index')
var subjects = require('./router/subjects')
var teachers = require('./router/teachers')
var students = require('./router/students')
const bodyParser = require('body-parser');

app.set('view engine','ejs')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/',index)
app.use('/subjects',subjects)
app.use('/teachers',teachers)
app.use('/students',students)
app.listen(3000)
