'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoryBlogSchema = Schema({
    name: String
});

module.exports = mongoose.model('CategoryBlog', CategoryBlogSchema);
