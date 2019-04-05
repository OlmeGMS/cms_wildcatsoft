'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Service = require('../models/services');


function getService(req, res) {
    var serviceId = req.params.id;

    Service.findById(serviceId, (err, service) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!service) {
                res.status(404).send({ message: 'La seccion de servicios no existe' });
            } else {
                res.status(200).send({ service });
            }
        }
    });
}

function getServices(req, res) {
    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }

    var itemsPerPage = 3;

    Service.find().sort('service').paginate(page, itemsPerPage, function(err, services, total) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!services) {
                res.status(404).send({ message: 'No hay seccion de servicios' });
            } else {
                res.status(200).send({ services: services });
            }
        }
    });
}

function getListServices(req, res) {
    Service.find({}, function(err, services) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!services) {
                res.status(404).send({ message: 'No hay seccion de servicios' });
            } else {
                res.status(200).send({ services: services });
            }
        }
    });
}

function saveService(req, res) {
    var service = new Service();
    var params = req.body;

    service.title_services = params.title_services;
    service.lead_services = params.lead_services;
    service.icon_services = params.icon_services;
    service.subtitle_services = params.subtitle_services;
    service.description_services = params.description_services;
    service.btn_service = params.btn_service;

    service.save((err, serviceStored) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!serviceStored) {
                res.status(404).send({ message: 'No se puedo guardar la seccion de servicios' });
            } else {
                res.status(200).send({ service: serviceStored });
            }
        }
    });
}

function updateService(req, res) {
    var serviceId = req.params.id;
    var update = req.body;

    Service.findOneAndUpdate({_id: serviceId}, update, {new: true}, (err, serviceUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!serviceUpdate) {
                res.status(404).send({ message: 'No se pudo actualizar la seccion de servicios' });
            } else {
                res.status(200).send({ service: serviceUpdate });
            }
        }
    });
}

function deleteService(req, res) {
    var serviceId = req.params.id;

    Service.findOneAndDelete({_id: serviceId, service: res.service}, (err, serviceRemove) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!serviceRemove) {
                res.status(404).send({ message: 'No se pudo eliminar la seccion de servicios' });
            } else {
                res.status(200).send({ service: serviceRemove });
            }
        }
    });
}


module.exports = {
    getService,
    getServices,
    getListServices,
    saveService,
    updateService,
    deleteService
}