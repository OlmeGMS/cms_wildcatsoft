'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Blog = require('../models/blog');


function getBlog(req, res) {
    var blogId = req.params.id;

    Blog.findById(blogId, (err, blog) => {
        if (err) {
            res.status(500).send({ message: ' Error en la petición' });
        } else {
            if (!blog) {
                res.status(404).send({ message: 'La sección de blog no existe' });
            } else {
                res.status(200).send({ blog });
            }
        }
    });
}

function getBlogs(req, res) {
    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }

    var itemsPerPage = 3;

    Blog.find().sort('contancts').paginate(page, itemsPerPage, function(err, blogs, total) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!blogs) {
                res.status(404).send({ message: 'No hay la seccion de blogs' });
            } else {
                res.status(200).send({ blogs: blogs });
            }
        }
    });
}

function getListBlogs(req, res) {
    Blog.find({}, function(err, blogs) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!blogs) {
                res.status(404).send({ message: 'No hay blogs' });
            } else {
                res.status(200).send({ blogs: blogs });
            }
        }
    });
}

function saveBlog(req, res) {
    var blog = new Blog();
    var params = req.body;

    blog.title_blog = params.title_blog;
    blog.lead_blog = params.lead_blog;
    blog.image_blog = null;
    blog.subtitle_blog = params.subtitle_blog;
    blog.date_blog = params.date_blog;
    blog.tag_blog = params.tag_blog;
    blog.autor_blog = params.autor_blog;


    blog.save((err, blogStored) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!blogStored) {
                res.status(404).send({ message: 'No se pudo guardar el blog' });
            } else {
                res.status(200).send({ blog: blogStored });
            }
        }
    })
}

function updateBlog(req, res) {
    var blogId = req.params.id;
    var update = req.body;

    Blog.findOneAndUpdate({_id: blogId}, update, {new: true}, (err, blogUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!blogUpdate) {
                res.status(404).send({ message: 'No se pudo actualizar' })
            } else {
                res.status(200).send({ blog: blogUpdate });
            }
        }
    });
}

function deleteBlog(req, res) {
    var blogId = req.params.id;

    Blog.findOneAndDelete({_id: blogId, blog: res.blog}, (err, blogRemove) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!blogRemove) {
                res.status(404).send({ message: 'No se pudo eliminar el blog' });
            } else {
                res.status(200).send({ blog: blogRemove });
            }
        }
    });
}

function uploadImage(req, res) {
    var blogId = req.params.id;
    var file_name = 'No ha subido imagen...';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\/');
        var file_name = file_split[2];

        // recoger la extencion de la imagen
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' ||
            file_ext == 'gif') {

            Blog.findOneAndUpdate({_id: blogId}, {image_blog: file_name}, {new: true}, (err, blogUpdate) => {
                if (err) {
                    res.status(500).send({ message: 'Error en la petición' });
                } else {
                    if (!blogUpdate) {
                        res.status(404).send({ message: 'No se pudo actualizar' })
                    } else {
                        res.status(200).send({ blog: blogUpdate });
                    }
                }
            });

        } else {
            res.status(200).send({
                message: 'La extensión del archivo noes valido'
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
    var path_file = './uploads/blog/' + imageFile;

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
    getBlog,
    getBlogs,
    getListBlogs,
    saveBlog,
    updateBlog,
    deleteBlog,
    uploadImage,
    getImageFile
}