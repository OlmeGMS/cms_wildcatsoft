'use strict'

var express = require('express');
var TestimoniesController = require('../controllers/testimonies');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

//subir ficheros
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/team'});

api.get('/testimonie/:id', md_auth.ensureAuth, TestimoniesController.getTestimonie);
api.post('/testimonie', md_auth.ensureAuth, TestimoniesController.saveTestimonie);
api.get('/testimonies/:id?', md_auth.ensureAuth, TestimoniesController.getTestimonies);
api.put('/testimonie/:id', md_auth.ensureAuth, TestimoniesController.updateTestimonie);
api.delete('/testimonie/:id', md_auth.ensureAuth, TestimoniesController.deleteTestimonie);
api.post('/upload-image-testimonie/:id', [md_auth.ensureAuth, md_upload], TestimoniesController.uploadImage);
api.get('/get-image-testimonie/:imageFile', TestimoniesController.getImageFile);

module.exports = api;
