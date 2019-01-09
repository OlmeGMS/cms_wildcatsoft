'use strict'

var express = require('express');
var ContactController = require('../controllers/contact');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/contact/:id', md_auth.ensureAuth, ContactController.getContact);
api.post('/contact', md_auth.ensureAuth, ContactController.saveContact);
api.get('/contacts:id?', md_auth.ensureAuth, ContactController.getContacts);
api.put('/contact/:id', md_auth.ensureAuth, ContactController.updateContact);
api.delete('/contact/:id', md_auth.ensureAuth, ContactController.deleteContact);

module.exports = api;