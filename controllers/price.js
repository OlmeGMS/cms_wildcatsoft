'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Price = require('../models/price');


function getPrice(req, res) {
    var priceId = req.params.id;

    Price.findById(priceId, (err, price) => {
        if (err) {
            res.status(500).send({ message: ' Error en la petición' });
        } else {
            if (!price) {
                res.status(404).send({ message: 'La sección de precio no existe' });
            } else {
                res.status(200).send({ price })
            }
        }
    });
}

function getPrices(req, res) {
    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }

    var itemsPerPage = 3;

    Price.find().sort('prices').paginate(page, itemsPerPage, function(err, prices, total) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!prices) {
                res.status(404).send({ message: 'No hay la seccion de precio' });
            } else {
                res.status(200).send({ prices: prices });
            }
        }
    });
}

function getListPrices(req, res) {
    Price.find({}, function(err, prices) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!prices) {
                res.status(404).send({ message: 'No hay precios' });
            } else {
                res.status(200).send({ prices: prices });
            }
        }
    });
}

function savePrice(req, res) {
    var price = new Price();
    var params = req.body;

    price.title_price = params.title_price;
    price.subtitle_price = params.subtitle_price;
    price.price_price = params.price_price;
    price.item_price = params.item_price;
    price.btn_price = params.btn_price;


    price.save((err, priceStored) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!priceStored) {
                res.status(404).send({ message: 'No se pudo guardar el precio' });
            } else {
                res.status(200).send({ price: priceStored });
            }
        }
    })
}

function updatePrice(req, res) {
    var priceId = req.params.id;
    var update = req.body;

    Price.findOneAndUpdate({_id: priceId}, update, {new: true}, (err, priceUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!priceUpdate) {
                res.status(404).send({ message: 'No se pudo actualizar' })
            } else {
                res.status(200).send({ price: priceUpdate });
            }
        }
    });

}

function deletePrice(req, res) {
    var priceId = req.params.id;

    Price.findOneAndDelete({_id: priceId, price: res.price}, (err, priceRemove) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!priceRemove) {
                res.status(404).send({ message: 'No se pudo eliminar el precio' });
            } else {
                res.status(200).send({ price: priceRemove });
            }
        }
    });
}

module.exports = {
    getPrice,
    getPrices,
    getListPrices,
    savePrice,
    updatePrice,
    deletePrice
}