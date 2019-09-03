'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogSchema = Schema({
    title_blog: String,
    lead_blog: String,
    image_blog: String,
    subtitle_blog: String,
    date_blog: Date,
    tag_blog: String,
    category_blog: {type: Schema.ObjectId, ref: 'CategoryBlog'},
    text_blog: String,
    autor_blog: {type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Blog', BlogSchema);
