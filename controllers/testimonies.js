'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Testimonie = require('../models/testimonies');


function getTestimonie(req, res) {
    var testimonieId = req.params.id;

    Testimonie.findById(testimonieId, (err, testimonie) => {
        if (err) {
            res.status(500).send({ message: ' Error en la petición' });
        } else {
            if (!testimonie) {
                res.status(404).send({ message: 'La sección de testimonio no existe' });
            } else {
                res.status(200).send({ testimonie })
            }
        }
    });
}

function getTestimonies(req, res) {
    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }

    var itemsPerPage = 3;

    Testimonie.find().sort('testimonies').paginate(page, itemsPerPage, function(err, testimonies, total) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!testimonies) {
                res.status(404).send({ message: 'No hay la seccion de testimonios' });
            } else {
                res.status(200).send({ testimonies: testimonies });
            }
        }
    });
}

function getListTestimonies(req, res) {
    Testimonie.find({}, function(err, testimonies) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!testimonies) {
                res.status(404).send({ message: 'No hay testimonios' });
            } else {
                res.status(200).send({ testimonies: testimonies });
            }
        }
    });
}

function saveTestimonie(req, res) {
    var testimonie = new Testimonie();
    var params = req.body;

    testimonie.title_testimonies = params.title_testimonies;
    testimonie.lead_testimonies = params.lead_testimonies;
    testimonie.name_testimonies = params.name_testimonies;
    testimonie.text_testiminies = params.text_testiminies;


    testimonie.save((err, testimonieStored) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!testimonieStored) {
                res.status(404).send({ message: 'No se pudo guardar la habilidad' });
            } else {
                res.status(200).send({ testimonie: testimonieStored });
            }
        }
    })
}

function updateTestimonie(req, res) {
    var skillId = req.params.id;
    var update = req.body;

    Testimonie.findOneAndUpdate({_id: testimonieId}, update, {new: true}, (err, updateTestimonie) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!updateTestimonie) {
                res.status(404).send({ message: 'No se pudo actualizar' });
            } else {
                res.status(200).send({ testimonie: updateTestimonie });
            }
        }
    });
}

function deleteTestimonie(req, res) {
    var testmionieId = req.params.id;

    Testimonie.findOneAndDelete({_id:testmionieId, testimonie: res.testimonie}, (err, testimonieRemove) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!testimonieRemove) {
                res.status(404).send({ message: 'No se pudo eliminar la habilidad' });
            } else {
                res.status(200).send({ testimonie: testimonieRemove });
            }
        }
    });
}

function uploadImage(req, res) {
    var testimonieId = req.params.id;
    var file_name = 'No ha subido imagen...';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\/');
        var file_name = file_split[2];

        // recoger la extencion de la imagen
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' ||
            file_ext == 'gif') {
        
            Testimonie.findOneAndUpdate({_id: testimonieId}, {image: file_name}, {new: true}, (err, updateTestimonie) => {
                if (err) {
                    res.status(500).send({ message: 'Error en la petición' });
                } else {
                    if (!updateTestimonie) {
                        res.status(404).send({ message: 'No se pudo actualizar' });
                    } else {
                        res.status(200).send({ testimonie: updateTestimonie });
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
    var path_file = './uploads/testimonies/' + imageFile;

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
    getTestimonie,
    getTestimonies,
    getListTestimonies,
    saveTestimonie,
    updateTestimonie,
    deleteTestimonie,
    uploadImage,
    getImageFile
}