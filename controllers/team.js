'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Team = require('../models/team');

function getTeam(req, res) {
    var teamId = req.params.id;

    Team.findById(teamId, (err, team) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!team) {
                res.status(404).send({ message: 'la seccion team no existe' });
            } else {
                res.status(200).send({ team: team });
            }
        }
    });
}

function getTeams(req, res) {
    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }

    var itemsPerPage = 10;

    Team.find().sort('team').paginate(page, itemsPerPage, function(err, teams, total) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!teams) {
                res.status(404).send({ message: 'No hay la seccion de queipo no exite' });
            } else {
                res.status(200).send({ teams: teams });
            }
        }
    });
}

function getListTeams(req, res) {
    Team.find({}, function(err, teams) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!teams) {
                res.status(404).send({ message: 'No se ha creado la seccionde equipo' });
            } else {
                res.status(200).send({ teams: teams });
            }
        }
    });
}

function saveTeam(req, res) {
    var team = new Team();
    var params = req.body;

    team.image_team = 'null';
    team.name_team = params.name_team;
    team.job_team = params.job_team;
    if (params.description_team) {
        team.description_team = params.description_team; 
    } else {
        team.description_team = 'null';
    }
    
    if (params.facebook) {
        team.facebook = params.facebook;
    } else {
        team.facebook = 'null';
    }
    
    if (params.twitter) {
        team.twitter = params.twitter;
    } else {
        team.twitter = 'null';
    }

    if (params.linkedin) {
        team.linkedin = params.linkedin;
    } else {
        team.linkedin = 'null';
    }

    if (params.instagram) {
        team.instagram = params.instagram;
    } else {
        team.instagram = 'null';
    }

    team.save((err, teamStored) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!teamStored) {
                res.status(404).send({ message: 'No se pudo guardar el miembro de integrante' });
            } else {
                res.status(200).send({ team: teamStored });
            }
        }
    });
}

function updateTeam(req, res) {
    var teamId = req.params.id;
    var update = req.body;

    Team.findOneAndUpdate({_id: teamId}, update, {new: true}, (err, teamUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!teamUpdate) {
                res.status(404).send({ message: 'No se pudo actualiar el integrante del grupo' });
            } else {
                res.status(200).send({ team: teamUpdate });
            }
        }
    });
}

function deleteTeam(req, res) {
    var teamId = req.params.id;

    Team.findOneAndDelete({_id: teamId, team: res.team}, (err, teamRemove) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!teamRemove) {
                res.status(404).send({ message: 'No se pudo eliminar el miebro del equipo' });
            } else {
                res.status(200).send({ team: teamRemove });
            }
        }
    });
}


function uploadImage(req, res) {
    var teamId = req.params.id;
    var file_name = 'No ha subido imagen...';
    
    if (req.files) {
        var file_path = req.files.image_team.path;
        var file_split = file_path.split('\/');
        var file_name = file_split[2];

        // recoger la extencion de la imagen
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' ||
            file_ext == 'gif') {

            Team.findOneAndUpdate({_id: teamId}, {image_team: file_name}, {new: true}, (err, teamUpdate) => {
                if (err) {
                    res.status(500).send({ message: 'Error en la petición' });
                } else {
                    if (!teamUpdate) {
                        res.status(404).send({ message: 'No se pudo actualiar el integrante del grupo' });
                    } else {
                        res.status(200).send({ team: teamUpdate });
                    }
                }
            });
        } else {
            res.status(200).send({
                message: 'La extensión del archivo noes valido'
            });
        }
    } else {
        res.status(200).send({
            message: 'No se ha subido ninguna imagen'
        });
    }
}

function getImageFile(req, res) {
    var imageFile = req.params.imageFile;
    var path_file = './uploads/team/' + imageFile;

    fs.exists(path_file, function(exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({
                message: 'No existe la imagen'
            });
        }
    });
}


module.exports = {
    getTeam,
    getTeams,
    getListTeams,
    getListTeams,
    saveTeam,
    updateTeam,
    deleteTeam,
    uploadImage,
    getImageFile
}