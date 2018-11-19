'use strict'

var express = require('express');
var SliderController = require('../controllers/slider');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

//subir ficheros
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/sliders'});

api.get('/slider/:id', md_auth.ensureAuth, SliderController.getSlider);
api.post('/slider', md_auth.ensureAuth, SliderController.saveSlider);
api.get('/slider/:id?', md_auth.ensureAuth, SliderController.getSliders);
api.put('/slider/:id', md_auth.ensureAuth, SliderController.updateSlider);
api.delete('/slider/:id', md_auth.ensureAuth, SliderController.deleteSlider);
api.post('/upload-image-slider/:id', [md_auth.ensureAuth, md_upload], SliderController.uploadImage);
api.get('/get-image-slider/:imageFile', SliderController.getImageFile);

module.exports = api;
