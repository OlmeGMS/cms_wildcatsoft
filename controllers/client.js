'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Client = require('../models/clients');


function getClient(req, res) {
    var clientId = req.params.id;

    Client.findById(clientId, (err, client) => {
        if (err) {
            res.status(500).send({ message: ' Error en la petición' });
        } else {
            if (!client) {
                res.status(404).send({ message: 'La sección de cliente no existe' });
            } else {
                res.status(200).send({ client })
            }
        }
    });
}

function getClients(req, res) {
    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }

    var itemsPerPage = 10;

    Client.find().sort('clients').paginate(page, itemsPerPage, function(err, clients, total) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!clients) {
                res.status(404).send({ message: 'No hay sección clientes' });
            } else {
                res.status(200).send({ clients: clients });
            }
        }
    });
}

function getListClients(req, res) {
    Client.find({}, function(err, clients) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!clients) {
                res.status(404).send({ message: 'No hay clientes' });
            } else {
                res.status(200).send({ clients: clients });
            }
        }
    });
}

function saveClient(req, res) {
    var client = new Client();
    var params = req.body;

    client.name_client = params.name_client;
    client.image_client = params.image_client;



    client.save((err, clientStored) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!clientStored) {
                res.status(404).send({ message: 'No se pudo guardar el cliente' });
            } else {
                res.status(200).send({ client: clientStored });
            }
        }
    })
}

function updateClient(req, res) {
    var clientId = req.params.id;
    var update = req.body;

    Client.findByIdAndUpdate(clientId, update, (err, updateClient) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!updateClient) {
                res.status(404).send({ message: 'No se pudo actualizar' });
            } else {
                res.status(200).send({ client: updateClient });
            }
        }
    });
}

function deleteClient(req, res) {
    var clientId = req.params.id;

    Client.findByIdAndRemove(clientId, (err, clientRemove) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!clientRemove) {
                res.status(404).send({ message: 'No se pudo eliminar el cliente' });
            } else {
                res.status(200).send({ client: clientRemove });
            }
        }
    });
}

function uploadImageClient(req, res) {
    var clientId = req.params.id;
    var file_name = 'No ha subido imagen...';

    if (req.files) {
        var file_path = req.files.image_client.path;
        var file_split = file_path.split('\/');
        var file_name = file_split[2];

        // recoger la extencion de la imagen
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext === 'png' || file_ext === 'jpg' ||
            file_ext === 'gif') {
            Client.findByIdAndUpdate(clientId, {
                image_client: file_name
            }, (err, clientUpdated) => {
                if (!clientUpdated) {
                    res.status(404).send({
                        message: 'No se ha podido actualizar el cliente'
                    });
                } else {
                    res.status(200).send({
                        image_client: file_name,
                        client: clientUpdated
                    });
                }
            });
        } else {
            res.status(200).send({
                message: 'La extensión del archivo no es valido'
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
    var path_file = './uploads/clients/' + imageFile;

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
    getClient,
    getClients,
    getListClients,
    saveClient,
    updateClient,
    deleteClient,
    uploadImageClient,
    getImageFile
}