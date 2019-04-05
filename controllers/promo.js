'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Promo = require('../models/promo');


function getPromo(req, res) {
    var promoId = req.params.id;

    Promo.findById(promoId, (err, promo) => {
        if (err) {
            res.status(500).send({ message: ' Error en la petición' });
        } else {
            if (!promo) {
                res.status(404).send({ message: 'La seccion promo no existe' });
            } else {
                res.status(200).send({ promo })
            }
        }
    });
}

function getPromos(req, res) {
    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }

    var itemsPerPage = 3;

    Promo.find().sort('promo').paginate(page, itemsPerPage, function(err, promos, total) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!promos) {
                res.status(404).send({ message: 'No hay la seccion de promos' });
            } else {
                res.status(200).send({ promos: promos });
            }
        }
    });
}

function getListPromo(req, res) {
    Promo.find({}, function(err, promos) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!promos) {
                res.status(404).send({ message: 'No hay promos' });
            } else {
                res.status(200).send({ promos: promos });
            }
        }
    });
}

function savePromo(req, res) {
    var promo = new Promo();
    var paras = req.body;

    promo.title_promo = params.title_promo;
    promo.btn_promo = params.btn_promo;

    promo.save((err, promoStored) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!promoStored) {
                res.status(404).send({ message: 'No se pudo guardar la seccion de promo' });
            } else {
                res.status(200).send({ promo: promoStored });
            }
        }
    })
}

function updatePromo(req, res) {
    var promoId = req.params.id;
    var update = req.body;

    Promo.findOneAndUpdate({_id: promoId}, update, {new: true}, (err, promoUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!promoUpdate) {
                res.status(404).send({ message: 'No se pudo actualizar' })
            } else {
                res.status(200).send({ promo: promoUpdate });
            }
        }
    });
}

function deletePromo(req, res) {
    var promoId = req.params.id;

    Promo.findOneAndDelete({_id: promoId, promo: res.promo}, (err, promoRemove) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!promoRemove) {
                res.status(404).send({ message: 'No se pudo eliminar la promo' });
            } else {
                res.status(200).send({ promo: promoRemove });
            }
        }
    }); 
}

module.exports = {
    getPromo,
    getPromos,
    getListPromo,
    savePromo,
    updatePromo,
    deletePromo
}