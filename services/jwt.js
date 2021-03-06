'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_cms_wildcatsoft';

exports.createToken = function(user){
  var payload = {
    sub: user._id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    image: user.image,
    rol: user.rol,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix
  };
  return jwt.encode(payload, secret);
}
