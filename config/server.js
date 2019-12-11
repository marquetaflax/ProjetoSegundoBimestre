let express = require('express'); 
let consign = require('consign');
let body_parser = require('body-parser');
let expressSession = require('express-session');
// let expressValidator = require('express-validator');
let app = express(); 

app.set('view engine', 'ejs'); 
app.set('views', './app/views');

app.use(express.static('./app/public')); //Define em qual pasta estarão os arquivos estáticos.
app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json());
// app.use(expressValidator());
app.use(expressSession({
    secret: 'ViscondedeSabugosa', //Segredo que pode ser qq um
    resave: false, //Regrava do lado do servidor toda vez
    saveUninitialized: false //cria uma sessão nova toda vez
}));

consign().include('app/routes')
.then('config/dbConnection.js')
.then('app/models')
.then('app/controllers')
.into(app);

module.exports = app;