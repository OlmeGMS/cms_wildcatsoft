'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SkillSchema = Schema({
  name_skill: String,
  percentage_skill: String
});


module.exports = mongoose.model('Skill', SkillSchema);
