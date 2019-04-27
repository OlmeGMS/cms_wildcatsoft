'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Slider = require('../models/slider');

function getSlider(req, res) {
    var sliderId = req.params.id;

    Slider.findById(sliderId, (err, slider) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!slider) {
                res.status(404).send({ message: 'El slider no exite' });
            } else {
                res.status(200).send({ slider: slider });
            }
        }
    });
}

function getSliders(req, res) {
    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }

    var itemsPerPage = 10;

    Slider.find().sort('slider').paginate(page, itemsPerPage, function(err, sliders, total) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!sliders) {
                res.status(404).send({ message: 'No hay slider' });
            } else {
                res.status(200).send({ sliders: sliders });
            }
        }
    });
}

function getListSliders(req, res) {
    Slider.find({}, function(err, sliders) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!sliders) {
                res.status(404).send({ message: 'No hay sliders creados' });
            } else {
                res.status(200).send({ sliders: sliders });
            }
        }
    });
}

function saveSlider(req, res) {
    var slider = new Slider();
    var params = req.body;

    slider.image_slider = 'null';
    slider.title_slider = params.title_slider;
    slider.subtitle_slider = params.subtitle_slider;
    slider.btn_slider = params.btn_slider;
    slider.status = true;

    slider.save((err, sliderStored) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!sliderStored) {
                res.status(404).send({ message: 'No se pudo guardar el slider' });
            } else {
                res.status(200).send({ slider: sliderStored });
            }
        }
    });
}

function updateSlider(req, res) {
    var sliderId = req.params.id;
    var update = req.body;

    Slider.findOneAndUpdate({_id: sliderId}, update, {new: true}, (err, sliderUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!sliderUpdate) {
                res.status(404).send({ message: 'No se pudo actualizar el slider' });
            } else {
                res.status(200).send({ slider: sliderUpdate });
            }
        }
    });
}

function deleteSlider(req, res) {
    var sliderId = req.params.id;

    Slider.findOneAndDelete({_id: sliderId, slider: res.slider}, (err, sliderRemove) => {
        if (err) {
            res.status(500).send({ message: 'Error al eliminar el slider' });
        } else {
            if (!sliderRemove) {
                res.status(404).send({ message: 'No se puedo eliminar el slider' });
            } else {
                res.status(200).send({ slider: sliderRemove });
            }
        }
    });
}

function uploadImage(req, res) {
    var sliderId = req.params.id;
    var file_name = 'No ha subido imagen...';

    if (req.files) {
        var file_path = req.files.image_slider.path;
        var file_split = file_path.split('\/');
        var file_name = file_split[2];

        // recoger la extencion de la imagen
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' ||
            file_ext == 'gif') {
            
            Slider.findOneAndUpdate({_id: sliderId}, {image_slider: file_name}, {new: true}, (err, sliderUpdate) => {
                if (err) {
                    res.status(500).send({ message: 'Error en la petición: '+ err });
                } else {
                    if (!sliderUpdate) {
                        res.status(404).send({ message: 'No se pudo actualizar el slider' });
                    } else {
                        res.status(200).send({ slider: sliderUpdate });
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
    var path_file = './uploads/sliders/' + imageFile;

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
    getSlider,
    getSliders,
    getListSliders,
    saveSlider,
    updateSlider,
    deleteSlider,
    uploadImage,
    getImageFile

}