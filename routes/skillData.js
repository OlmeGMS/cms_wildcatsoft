'use strict'

var express = require('express');
var SkillDataController = require('../controllers/skillData');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/skill-data/:id', md_auth.ensureAuth, SkillDataController.getSkill);
api.post('/skill-data', md_auth.ensureAuth, SkillDataController.saveSkill);
api.get('/skill-data-list/', SkillDataController.getListSkills);
api.get('/skills-data/:page?', md_auth.ensureAuth, SkillDataController.getSkills);
api.put('/skill-data/:id', md_auth.ensureAuth, SkillDataController.updateSkill);
api.delete('/skill-data/:id', md_auth.ensureAuth, SkillDataController.deleteSkill);

module.exports = api;
