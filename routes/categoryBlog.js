'use strict'

var express = require('express');
var CategoryBlogController = require('../controllers/categoryBlog');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

//subir ficheros
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/blog' });

api.get('/category_blog/:id', md_auth.ensureAuth, CategoryBlogController.getCategoryBlog);
api.post('/category_blog', md_auth.ensureAuth, CategoryBlogController.saveCategoryBlog);
api.get('/category_blogs/:id?', md_auth.ensureAuth, CategoryBlogController.getCategoriesBlog);
api.put('/category_blog/:id', md_auth.ensureAuth, CategoryBlogController.updateCategoryBlog);
api.delete('/category_blog/:id', md_auth.ensureAuth, CategoryBlogController.deleteCategoryBlog);


module.exports = api;