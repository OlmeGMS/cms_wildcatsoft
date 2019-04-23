'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SkillDataSchema = Schema({
  title_skill: String,
  paragraph_skill: String
});


module.exports = mongoose.model('SkillData', SkillDataSchema);
