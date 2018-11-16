'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api  = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/users'});

api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.post('/add-user', md_auth.ensureAuth, UserController.saveUser);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
api.put('/update-password-user/:id', md_auth.ensureAuth, UserController.updatePassword);
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/get-image-user/:imageFile', UserController.getImageFile);
api.get('/users/', md_auth.ensureAuth, UserController.getListUser);
api.delete('/user/:id', md_auth.ensureAuth, UserController.deleteUser);
api.get('/search-user/:id', md_auth.ensureAuth, UserController.searchUser);
module.exports = api;
