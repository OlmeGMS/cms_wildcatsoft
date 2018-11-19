'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var About = require('../models/about');

function getAbout(req, res)
{
  var aboutId = req.params.id;

  About.findById(aboutId, (err, aboutId) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!about) {
        res.status(404).send({message: 'El about no existe'});
      }else{
        res.status(200).send({about});
      }
    }
  });


}

function getAbouts(req, res)
{
  if (req.params.page) {
    var page = req.params.page;
  }else{
    var page = 1;
  }

  var itemsPerPage = 3;

  About.find().sort('about').paginate(page, itemsPerPage, function(err, abouts, total){
    if(err){
      res.satatus(500).send({message: 'Error en la petición'});
    }else {
      if(!abouts){
        res.status(404).send({message: 'No hay abouts'});
      }else {
        res.status(200).send({abouts: abouts});
      }
    }
  });
}

function getListAbout(req, res)
{
  About.find({}, function (err, abouts){
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else{
      if(!abouts){
        res.status(404).send({message: 'No hay seccion de about'});
      }else {
        res.status(200).send({abouts: abouts});
      }
    }
  });
}

function saveAbout(req, res)
{
  var about = new About();
  var params = req.body;

  about.title_about = params.title_about;
  about.lead_about = params.lead_about;
  about.icon_about = params.icon_about;
  about.subtitle_about = params.subtitle_about;
  about.description_about = params.description_about;
  about.btn_about = params.btn_about;

  about.save((err, aboutStored) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if(!aboutStored){
        res.status(404).send({message: 'No se pudo guardar la seccion de about'});
      }else {
        res.status(200).send({about: aboutStored});
      }
    }
  });
}

function updateAbout(req, res)
{
  var aboutId = req.params.id;
  var update = req.body;

  About.findByIdAndUpdate(aboutId, update, (err, aboutUpdate) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else{
      if (!aboutUpdate) {
        res.status(404).send({message: 'No se puedo actualizar la seccion de about'});
      }else {
        res.status(200).send({about: aboutUpdate});
      }
    }
  });

}

function deleteAbout(req, res)
{
  var aboutId = req.params.id;

  About.findByIdAndRemove(aboutId, (err, aboutRemove) => {
    if (err) {
      res.status(500).send({message: 'error en la petición'});
    }else{
      if (!aboutRemove) {
        res.status(404).send({message: 'No se pudo eliminar la seccion de about'});
      }else {
        res.status(200).send({aboutRemove});
      }
    }

  });
}

module.exports = {
  getAbout,
  getAbouts,
  getListAbout,
  saveAbout,
  updateAbout,
  deleteAbout

}
