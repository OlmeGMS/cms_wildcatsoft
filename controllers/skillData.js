'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var SkillData = require('../models/skillData');


function getSkill(req, res) {
    var skillId = req.params.id;

    SkillData.findById(skillId, (err, skill) => {
        if (err) {
            res.status(500).send({ message: ' Error en la petición' });
        } else {
            if (!skill) {
                res.status(404).send({ message: 'La sección de habilidades no existe' });
            } else {
                res.status(200).send({ skill: skill });
            }
        }
    });
}

function getSkills(req, res) {

    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }

    var itemsPerPage = 3;

    SkillData.find().sort('skillData').paginate(page, itemsPerPage, function(err, skills, total) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!skills) {
                res.status(404).send({ message: 'No hay la seccion de habilidades' });
            } else {
                res.status(200).send({ skills: skills });
            }
        }
    });
}

function getListSkills(req, res) {
    SkillData.find({}, function(err, skills) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!skills) {
                res.status(404).send({ message: 'No hay habilidades' });
            } else {
                res.status(200).send({ skills: skills });
            }
        }
    });
}

function saveSkill(req, res) {
    var skill = new SkillData();
    var params = req.body;
    skill.title_skill = params.title_skill;
    skill.paragraph_skill = params.paragraph_skill;

    skill.save((err, skillStored) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!skillStored) {
                res.status(404).send({ message: 'No se pudo guardar la habilidad' });
            } else {
                res.status(200).send({ skill: skillStored });
            }
        }
    });
}

function updateSkill(req, res) {
    var skillId = req.params.id;
    var update = req.body;

    SkillData.findOneAndUpdate({_id: skillId}, update, {new: true}, (err, skillUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!skillUpdate) {
                res.status(404).send({ message: 'No se pudo actualizar' })
            } else {
                res.status(200).send({ skill: skillUpdate });
            }
        }
    });
}

function deleteSkill(req, res) {
    var skillId = req.params.id;

    SkillData.findOneAndDelete({_id: skillId, skill: res.skill}, (err, skillRemove) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!skillRemove) {
                res.status(404).send({ message: 'No se pudo eliminar la habilidad' });
            } else {
                res.status(200).send({ skill: skillRemove });
            }
        }
    });
}

module.exports = {
    getSkill,
    getSkills,
    getListSkills,
    saveSkill,
    updateSkill,
    deleteSkill
};