'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
  image: String,
  rol: { type: Schema.ObjectId, ref: 'Rol'},
  status: Boolean
});

module.exports = mongoose.model('User', UserSchema);
