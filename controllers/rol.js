'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Rol = require('../models/rol');

function pruebas(req, res)
{
  res.status(200).send({message: 'Probando el controlador de rol'});
}

function getRol(req, res)
{
  var rolId = req. params.id;

  Rol.findById(rolId, (err, rol) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!rol) {
        res.status(404).send({message: 'El rol no existe'});
      }else {
        res.status(200).send({rol});
      }
    }
  });
}

function getRoles(req, res)
{
  if (req.params.page) {
    var page = req.params.page;
  }else {
    var page = 1;
  }

  var itemsPerPage = 3;

  Rol.find().sort('rol').paginate(page, itemsPerPage, function(err, roles, total){
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!roles) {
        res.status(404).send({message: 'No hay roles creados !!'});
      }else {
        res.status(200).send({roles: roles});
      }
    }
  });
}

function getListRoles(req, res)
{
  Rol.find({}, function(err, roles){
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!roles) {
        res.status(404).send({message: 'No hay roles'});
      }else {
        res.status(200).send({roles: roles});
      }
    }
  });
}

function saveRol(req, res)
{
  var rol = new Rol();
  var params = req.body;
  rol.name = params.name;
  rol.status = params.satatus;

  rol.save((err, rolStored) => {
    if (err) {
      res.status(500).send({message: 'Error no se pudo guardar el rol'});
    }else {
      if (! rolStored) {
        res.status(404).send({message: 'El rol no ha sido guardado'});
      }else {
        res.status(200).send({rol: rolStored});
      }
    }
  });

}

function updateRol(req, res)
{
  var rolId = req.params.id;
  var update = req.body;

  Rol.findByIdAndUpdate(rolId, update, (err, rolUpdate) => {
    if (err) {
      res.status(500).send({message: 'Error al actualizar el rol'});
    }else {
      if (!rolUpdate) {
        res.status(404).send({message: 'No se pudo actualizar el rol'});
      }else {
        res.status(200).send({rol: rolUpdate});
      }
    }
  });
}

function deleteRol(req, res)
{
  var rolId = req.params.id;

  Rol.findByIdAndRemove(rolId, (err, rolRemove) => {
    if (err) {
      res.status(500).send({message: 'Error en la peticón'});
    }else {
      if (!rolRemove) {
        res.status(404).send({message: 'El rol no ha sio eliminado'});
      }else {
        res.status(200).send({rolRemove});
      }
    }
  });
}



module.exports = {
  pruebas,
  getRol,
  getRoles,
  getListRoles,
  saveRol,
  updateRol,
  deleteRol
};
