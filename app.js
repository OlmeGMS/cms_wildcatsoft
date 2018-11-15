'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configurar cabecera http

//ruta base

app.get('/pruebas', function(req, res){
  res.status(200).send({message: 'Bienvenidos al cms en node'});
});

module.exports = app;
