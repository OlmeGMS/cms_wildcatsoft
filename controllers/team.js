'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Team = require('../models/team');

function getTeam(req, res)
{
  var teamId = req.params.id;

  Team.findById(teamId, (err, teamId) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!team) {
        res.status(404).send({message: 'la seccion team no existe'});
      }else {
        res.status(200).send({team});
      }
    }
  });
}

function getTeams(req, res)
{
  if (req.params.page) {
    var page = req.params.page;
  }else{
    var page = 1;
  }

  var itemsPerPage = 3;

  Team.find().sort('team').paginate(page, itemsPerPage, function(err, teams, total){
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if(!teams){
        res.status(404).send({message: 'No hay la seccion de queipo no exite'});
      }else {
        res.status(200).send({teams: teams});
      }
    }
  });
}

function getListTeams(req, res)
{
  Team.find({}, function(err, teams){
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!teams) {
        res.status(404).send({message: 'No se ha creado la seccionde equipo'});
      }else{
        res.status(200).send({teams: teams});
      }
    }
  });
}

function saveTeam(req, res)
{
  var team = new Team();
  var params = req.body;

  team.image_team = 'null';
  team.name_team = params.name_team;
  team.job_team = params.job_team;
  team.description_team = params.description_team;
  team.redes_team = params.redes_team;

  team.save((err, teamStored) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!teamStored) {
        res.status(404).send({message: 'No se pudo guardar el miembro de integrante'});
      }else {
        res.status(200).send({team: teamStored});
      }
    }
  });
}

function updateTeam(req, res)
{
  var teamId = req.params.id;
  var update = req.body;

  Team.findByIdAndUpdate(teamId, update, (err, teamUpdate) => {
    if (err) {
      res.status(500).send(500).({message: 'Error en la petición'});
    }else {
      if (!teamUpdate) {
        res.status(404).send({message: 'No se pudo actualiar el integrante del grupo'});
      }else {
        res.status(200).send({team: teamUpdate});
      }
    }
  });
}


module.exports = {
  getTeam,
  getTeams,
  getListTeams,
  getListTeams,
  saveTeam,
  updateTeam

}
