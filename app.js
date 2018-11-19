'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

//cargar rutas
var rol_routes = require('./routes/rol');
var user_routes = require('./routes/user');
var slider_routes = require('./routes/slider');
var about_routes = require('./routes/about');
var service_routes = require('./routes/service');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// configurar cabeceras http
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Se permite el acceso a todos los dominios
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'); //cabecera ajax
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); // metodos http
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  next();
});

//ruta base
app.use('/', express.static('client', {redirect: false}));
app.use('/api', rol_routes);
app.use('/api', user_routes);
app.use('/api', slider_routes);
app.use('/api', about_routes);
app.use('/api', service_routes);

module.exports = app;
