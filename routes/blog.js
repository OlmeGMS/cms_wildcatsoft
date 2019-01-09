'use strict'

var express = require('express');
var BlogController = require('../controllers/blog');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

//subir ficheros
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/blog' });

api.get('/blog/:id', md_auth.ensureAuth, BlogController.getBlog);
api.post('/blog', md_auth.ensureAuth, BlogController.saveBlog);
api.get('/blogs/:id?', md_auth.ensureAuth, BlogController.getBlogs);
api.put('/blog/:id', md_auth.ensureAuth, BlogController.updateBlog);
api.delete('/blog/:id', md_auth.ensureAuth, BlogController.deleteBlog);
api.post('/upload-image-blog/:id', [md_auth.ensureAuth, md_upload], BlogController.uploadImage);
api.get('/get-image-blog/:imageFile', BlogController.getImageFile);

module.exports = api;