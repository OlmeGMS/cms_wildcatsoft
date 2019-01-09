'use strict'

var express = require('express');
var CommentController = require('../controllers/comments');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/comment/:id', md_auth.ensureAuth, CommentController.getComment);
api.post('/comment', md_auth.ensureAuth, CommentController.saveComment);
api.get('/comments:id?', md_auth.ensureAuth, CommentController.getComments);
api.put('/comment/:id', md_auth.ensureAuth, CommentController.updateComment);
api.delete('/comment/:id', md_auth.ensureAuth, CommentController.deleteComment);

module.exports = api;