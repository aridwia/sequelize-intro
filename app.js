
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');


let app = express();

var index = require ('./router/index')
var login = require ('./router/login')
var dashboard = require ('./router/dashboard')
var teacher = require ('./router/teachers')
var subject = require ('./router/subjects')
var student = require ('./router/students')

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use(session({
  secret: '&*^*&#$^7sdfjgsdj78^&*usdfsgf',
  resave: false,
  saveUnitialized: true,
  cookie: {}
}))

app.use('/login', login);
app.use('/dashboard', dashboard);
app.use('/', index);

app.use('/teachers', teacher);
app.use('/subjects', subject);
app.use('/students', student);

app.listen(process.env.port||3000)
