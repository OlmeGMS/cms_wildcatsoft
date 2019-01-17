'use strict'
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var Rol = require('../models/rol');
var jwt = require('../services/jwt');

function saveUser(req, res) {
    var user = new User();
    var params = req.body;

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.image = 'null';
    user.rol = params.rol;

    if (params.password) {
        // Cifrar las contraseñas
        bcrypt.hash(params.password, null, null, function(err, hash) {
            user.password = hash;
            if (user.name != null && user.surname != null && user.email != null && user.rol != null) {
                // Guardar usuario
                user.save((err, userStored) => {
                    if (err) {
                        res.status(500).send({ message: 'Error no se puedo guardar el usuario' });
                    } else {
                        if (!userStored) {
                            res.status(404).send({ message: 'No se ha registrado el usuario' });
                        } else {
                            res.status(200).send({ user: userStored });
                        }
                    }
                });
            } else {
                res.status(500).send({ message: 'Rellena los campos' });
            }
        });

    } else {
        res.status(500).send({ message: 'Introduce la contraseña' });
    }
}

function loginUser(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()}).populate({path: 'rol'}).exec((err, user) => {

        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!user) {
                res.status(404).send({ message: 'El usuario no existe' });
            } else {
                //Comprobar la contraseña
                bcrypt.compare(password, user.password, function(err, check) {
                    if (check) {
                        //Devolvemos los datos del usuario logueado
                        if (params.gethash) {
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        } else {
                            res.status(200).send({ user });
                        }
                    } else {
                        res.status(404).send({ message: 'El usuario no ha podido loguearse' });
                    }
                });
            }

        }
    });
}

function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;
    if (userId != req.user.sub) {
        return res.status(403).send({ message: 'No tienes permisos para actualizar este usuario' });
    }

    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error no se puedo acutalizar el usuario' });
        } else {
            if (!userUpdated) {
                res.status(404).send({ message: 'El usuario no ha podido actualizarse' });
            } else {
                res.status(200).send({ user: userUpdated });
            }
        }
    });
}

function updatePassword(req, res) {
    var user = new User();
    var userId = req.params.id;
    var update = req.body;
    var password = update.password;
    //console.log(update);
    console.log(userId);
    //console.log(password);


    if (password) {
        // Cifrar las contraseñas
        bcrypt.hash(password, null, null, function(err, hash) {
            user.password = hash;
            // Actualizar pass usuario
            update.password = hash;
            //console.log(hash);
            //console.log(update);

            User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
                if (err) {
                    res.status(500).send({ message: 'Error no se puedo acutalizar el usuario' });
                } else {
                    if (!userUpdated) {
                        res.status(404).send({ message: 'El usuario no ha podido actualizarse' });
                    } else {
                        res.status(200).send({ user: userUpdated });
                    }
                }
            });

        });

    } else {
        res.status(500).send({ message: 'Introduce la contraseña' });
    }



}

function deleteUser(req, res) {
    var userId = req.params.id;

    User.findByIdAndRemove(userId, (err, userRemove) => {
        if (err) {
            res.status(500).send({ message: 'Error al eliminar el usuario' });
        } else {
            if (!userRemove) {
                res.status(404).send({ message: 'El usuario no ha sido eliminado' });
            } else {
                res.status(200).send({ user: userRemove });
            }
        }
    });
}

function uploadImage(req, res) {
    var userId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.image.path;

        var file_split = file_path.split('\/');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext === 'png' || file_ext === 'jpg' || file_ext === 'gif') {
            User.findByIdAndUpdate(userId, {
                image: file_name
            }, (err, userUpdated) => {
                if (!userUpdated) {
                    res.status(404).send({
                        message: 'No se ha podido actualizar el usuario'
                    });
                } else {
                    res.status(200).send({
                        image: file_name,
                        user: userUpdated
                    });
                }
            });
        } else {
            res.status(200).send({
                message: 'Extensión del archivo no es correcta'
            });
        }

        console.log(file_path);
    } else {
        res.status(200).send({
            message: 'No ha subido ninguna imagen ...'
        });
    }
}

function getImageFile(req, res) {
    var imageFile = req.params.imageFile;
    var path_file = './uploads/users/' + imageFile;
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

function getListUser(req, res) {
    var find = User.find({}).sort('user');

    find.populate({ path: 'rol' }).exec((err, users) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!users) {
                res.status(404).send({ message: 'No hay usuarios' });
            } else {
                res.status(200).send({ users: users });
            }
        }
    });
}

function searchUser(req, res) {
    var dni = req.params.id;
    var find = User.find({ dni: dni }).sort('user').where('dni').equals(dni);
    find.populate({ path: 'dni' }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!user) {
                res.status(404).send({ message: 'No hay usuario' });
                console.log('no encontro');
            } else {
                res.status(200).send({ user });
            }
        }
    });
}



module.exports = {
    saveUser,
    loginUser,
    updateUser,
    deleteUser,
    uploadImage,
    updatePassword,
    getImageFile,
    getListUser,
    searchUser
};