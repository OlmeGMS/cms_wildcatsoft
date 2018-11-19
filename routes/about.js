'use strict'

var express = require('express');
var AboutController = require('../controllers/about');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


api.get('/about/:id', md_auth.ensureAuth, AboutController.getAbout);
api.post('/about', md_auth.ensureAuth, AboutController.saveAbout);
api.get('/about/:id?', md_auth.ensureAuth, AboutController.getAbouts);
api.put('/about/:id', md_auth.ensureAuth, AboutController.updateAbout);
api.delete('/about/:id', md_auth.ensureAuth, AboutController.deleteAbout);

module.exports = api;
