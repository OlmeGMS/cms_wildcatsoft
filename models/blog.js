'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogSchema = Schema({
    title_blog: String,
    lead_blog: String,
    image_blog: String,
    subtitle_blog: String,
    date_blog: Date,
    tag_blog: Date,
    category_blog: {type: Schema.ObjectId, ref: 'CategoryBlog'},
    autor_blog: {type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Blog', BlogSchema);
