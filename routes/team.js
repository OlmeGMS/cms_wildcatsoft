'use strict'

var express = require('express');
var TeamController = require('../controllers/team');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

//subir ficheros
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/team'});

api.get('/team/:id', md_auth.ensureAuth, TeamController.getTeam);
api.post('/team', md_auth.ensureAuth, TeamController.saveTeam);
api.get('/teams/:id?', md_auth.ensureAuth, TeamController.getTeams);
api.put('/team/:id', md_auth.ensureAuth, TeamController.updateTeam);
api.delete('/team/:id', md_auth.ensureAuth, TeamController.deleteTeam);
api.post('/upload-image-team/:id', [md_auth.ensureAuth, md_upload], TeamController.uploadImage);
api.get('/get-image-team/:imageFile', TeamController.getImageFile);

module.exports = api;
