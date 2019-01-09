'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentsSchema = Schema({
    blog: { type: Schema.ObjectId, ref: 'Blog' },
    user: { type: Schema.ObjectId, ref: 'User' },
    texto_comments: String,
    date_comments: Date,
    reply_comments: Boolean
});

module.exports = mongoose.model('Comments', CommentsSchema);