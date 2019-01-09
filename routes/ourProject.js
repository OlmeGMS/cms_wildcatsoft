'use strict'

var express = require('express');
var OurProjectController = require('../controllers/ourProject');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

//subir ficheros
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/ourPoject' });

api.get('/our-project/:id', md_auth.ensureAuth, OurProjectController.getOurProject);
api.post('/our-project', md_auth.ensureAuth, OurProjectController.saveOurProject);
api.get('/our-project/:id?', md_auth.ensureAuth, OurProjectController.getOurProjects);
api.put('/our-project/:id', md_auth.ensureAuth, OurProjectController.updateOurProject);
api.delete('/our-project/:id', md_auth.ensureAuth, OurProjectController.deleteOurProject);
api.post('/upload-image-our-project/:id', [md_auth.ensureAuth, md_upload], OurProjectController.uploadImage);
api.get('/get-image-our-project/:imageFile', OurProjectController.getImageFile);

module.exports = api;