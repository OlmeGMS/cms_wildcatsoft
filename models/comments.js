'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comments = Schema({
  id_blog: { type: Schema.ObjectId, ref: 'Blog'},
  id_user: { type: Schema.ObjectId, ref: 'User'},
  texto_comments: String,
  date_comments: Date,
  reply_comments: Boolean
});

module.exports = mongoose.model('Comments', CommentsSchema);
