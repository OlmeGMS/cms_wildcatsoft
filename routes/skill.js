'use strict'

var express = require('express');
var SkillController = require('../controllers/skill');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/skill/:id', md_auth.ensureAuth, SkillController.getSkill);
api.post('/skill', md_auth.ensureAuth, SkillController.saveSkill);
api.get('/skill/:id?', md_auth.ensureAuth, SkillController.getSkills);
api.put('/skill/:id', md_auth.ensureAuth, SkillController.updateSkill);
api.delete('/skill/:id', md_auth.ensureAuth, SkillController.deleteSkill);

module.exports = api;
