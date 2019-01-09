'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Contact = require('../models/contact');


function getContact(req, res) {
    var contactId = req.params.id;

    Contact.findById(contactId, (err, contact) => {
        if (err) {
            res.status(500).send({ message: ' Error en la petición' });
        } else {
            if (!contact) {
                res.status(404).send({ message: 'La sección de contacto no existe' });
            } else {
                res.status(200).send({ contact })
            }
        }
    });
}

function getContacts(req, res) {
    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }

    var itemsPerPage = 3;

    Contact.find().sort('contancts').paginate(page, itemsPerPage, function(err, contacts, total) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!contacts) {
                res.status(404).send({ message: 'No hay la seccion de contacto' });
            } else {
                res.status(200).send({ contacts: contacts });
            }
        }
    });
}

function getListContacts(req, res) {
    Contact.find({}, function(err, contacts) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!contacts) {
                res.status(404).send({ message: 'No hay contactos' });
            } else {
                res.status(200).send({ contacts: contacts });
            }
        }
    });
}

function saveContact(req, res) {
    var contact = new Contact();
    var params = req.body;

    contact.title_contact = params.title_contact;
    contact.description_contact = params.description_contact;
    contact.address_contact = params.address_contact;
    contact.phone_contact = params.phone_contact;
    contact.email_contact = params.email_contact;
    contact.lat_contact = params.lat_contact;
    contact.lng_contact = params.lng_contact;


    contact.save((err, contactStored) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!contactStored) {
                res.status(404).send({ message: 'No se pudo guardar el contacto' });
            } else {
                res.status(200).send({ contact: contactStored });
            }
        }
    })
}

function updateContact(req, res) {
    var contactId = req.params.id;
    var update = req.body;

    Contact.findByIdAndUpdate(contactId, update, (err, contactUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!contactUpdate) {
                res.status(404).send({ message: 'No se pudo actualizar' })
            } else {
                res.status(200).send({ contact: contactUpdate });
            }
        }
    });
}

function deleteContact(req, res) {
    var contactId = req.params.id;

    Contact.findByIdAndRemove(contactId, (err, contactRemove) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!contactRemove) {
                res.status(404).send({ message: 'No se pudo eliminar el contacto' });
            } else {
                res.status(200).send({ contact: contactRemove });
            }
        }
    });
}

module.exports = {
    getContact,
    getContacts,
    getListContacts,
    saveContact,
    updateContact,
    deleteContact
}