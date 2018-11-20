'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Promo= require('../models/promo');


function getPromo(req, res)
{
  var promoId = req.params.id;

  Promo.findById(promoId, (err, promo) => {
    if (err) {
      res.status(500).send({message: ' Error en la petición'});
    }else {
      if (!promo) {
        res.status(404).send({message: 'La seccion promo no existe'});
      }else{
        res.status(200).send({promo})
      }
    }
  });
}

function getPromos(req, res)
{
  if (req.params.page) {
    var page = req.params.page;
  }else{
    var page = 1;
  }

  var itemsPerPage = 3;

  Promo.find().sort('promo').paginate(page, itemsPerPage, function(err, promos, total){
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!promos) {
        res.status(404).send({message: 'No hay la seccion de promos'});
      }
    }
  });
}
