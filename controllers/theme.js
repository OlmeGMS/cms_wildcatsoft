'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Theme = require('../models/theme');


function getTheme(req, res) {
    var thmeId = req.params.id;

    Theme.findById(themeId, (err, theme) => {
        if (err) {
            res.status(500).send({ message: ' Error en la petición' });
        } else {
            if (!theme) {
                res.status(404).send({ message: 'La sección de tema no existe' });
            } else {
                res.status(200).send({ theme })
            }
        }
    });
}

function getThemes(req, res) {
    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }

    var itemsPerPage = 3;

    Theme.find().sort('themes').paginate(page, itemsPerPage, function(err, themes, total) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!themes) {
                res.status(404).send({ message: 'No hay la sección de tema' });
            } else {
                res.status(200).send({ themes: themes });
            }
        }
    });
}

function getListTheme(req, res) {
    Theme.find({}, function(err, themes) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!themes) {
                res.status(404).send({ message: 'No hay temas' });
            } else {
                res.status(200).send({ themes: themes });
            }
        }
    });
}

function saveTheme(req, res) {
    var theme = new Theme();
    var params = req.body;

    theme.name_theme = params.name_theme;



    theme.save((err, themeStored) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!themeStored) {
                res.status(404).send({ message: 'No se pudo guardar el tema' });
            } else {
                res.status(200).send({ theme: themeStored });
            }
        }
    })
}

function updateTheme(req, res) {
    var themeId = req.params.id;
    var update = req.body;

    Theme.findByIdAndUpdate(themeId, update, (err, themeUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!themeUpdate) {
                res.status(404).send({ message: 'No se pudo actualizar' })
            } else {
                res.status(200).send({ theme: themeUpdate });
            }
        }
    });
}

function deleteTheme(req, res) {
    var themeId = req.params.id;

    Theme.findByIdAndRemove(themeId, (err, themeRemove) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!themeRemove) {
                res.status(404).send({ message: 'No se pudo eliminar el thema' });
            } else {
                res.status(200).send({ theme: themeRemove });
            }
        }
    });
}

module.exports = {
    getTheme,
    getThemes,
    getListTheme,
    saveTheme,
    updateTheme,
    deleteTheme
}