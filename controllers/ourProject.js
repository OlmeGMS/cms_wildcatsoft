'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var OurProject = require('../models/ourProject');


function getOurProject(req, res) {
    var ourProjectId = req.params.id;
    OurProject.findById(ourProjectId, (err, ourProject) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!ourProject) {
                res.status(404).send({ message: 'No hay proyectos' });
            } else {
                res.status(200).send({ ourProject: ourProject });
            }
        }
    });
}

function getOurProjects(req, res) {
    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }

    var itemsPerPage = 3;

    OurProject.find().sort('ourProject').paginate(page, itemsPerPage, function(err, ourProjects, total) {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!ourProjects) {
                res.status(404).send({ message: 'No hay proyectos' });
            } else {
                res.status(202).send({ ourProjects: ourProjects });
            }
        }
    })
}

function getListOurPorject(req, res) {
    OurProject.find({}, function(err, ourProjects) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!ourProjects) {
                res.status(404).send({ message: 'No hay promos' });
            } else {
                res.status(202).send({ ourProjects: ourProjects });
            }
        }
    });
}

function saveOurProject(req, res) {
    var ourProject = new OurProject();
    var params = req.body;

    ourProject.title_ourProject = params.title_ourProject;
    ourProject.tag_ourProject = params.tag_ourProject;

    ourProject.save((err, ourProjectStored) => {
        if (err) {
            res.status(500).send({ message: 'error en la peticion' });
        } else {
            if (!ourProjectStored) {
                res.status(404).send({ message: 'No se pudo crear la seccion' });
            } else {
                res.status(200).send({ ourProject: ourProjectStored });
            }
        }
    });
}

function updateOurProject(req, res) {
    var ourProjectId = req.params.id;
    var update = req.body;

    OurProject.findByIdAndUpdate(ourProjectId, update, (err, ourProjectUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!ourProjectUpdate) {
                res.status(404).send({ message: 'No se puedo actualizar el proyecto' });
            } else {
                res.status(200).send({ ourProject: ourProjectUpdate });
            }
        }
    });
}

function deleteOurProject(req, res) {
    var ourProjectId = req.params.id;

    OurProject.findByIdAndRemove(ourProjectId, (err, ourProjectRemove) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!ourProjectRemove) {
                res.status(404).send({ message: 'No se pudo eliminar el proyecto' });
            } else {
                res.status(200).send({ ourProject: ourProjectRemove });
            }
        }
    });
}

function uploadImage(req, res) {
    var ourProjectId = req.params.id;
    var file_name = 'No ha subido imagen...';

    if (req.files) {
        var file_path = req.files.image_ourProject.path;
        var file_split = file_path.split('\/');
        var file_name = file_split[2];

        // recoger la extencion de la imagen
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' ||
            file_ext == 'gif') {
            OurProject.findByIdAndUpdate(ourProjectId, {
                image_ourProject: file_name
            }, (err, ourProjectUpdated) => {
                if (!ourProjectId) {
                    res.status(404).send({
                        message: 'No se ha podido actualizar el slider'
                    });
                } else {
                    res.status(200).send({
                        image_ourProject: file_name,
                        ourPorject: ourProjectUpdated
                    });
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
    var path_file = './uploads/ourProject/' + imageFile;

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
    getOurProject,
    getOurProjects,
    getListOurPorject,
    saveOurProject,
    updateOurProject,
    deleteOurProject,
    uploadImage,
    getImageFile
}