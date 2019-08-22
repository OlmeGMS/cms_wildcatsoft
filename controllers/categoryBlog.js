'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var CategoryBlog = require('../models/categoryBlog');

function getCategoryBlog(req, res) {
    var categoryBlogId = req.params.id;

    CategoryBlog.findById(categoryBlogId, (err, categoryBlog) => {
        if (err) {
            res.status(500).send({ message: ' Error en la petición' });
        } else {
            if (!categoryBlog) {
                res.status(404).send({ message: 'La categoria no existe' });
            } else {
                res.status(200).send({ categoryBlog: categoryBlog });
            }
        }
    });
}

function getCategoriesBlog(req, res) {
    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }

    var itemsPerPage = 10;

    CategoryBlog.find().sort('categoryBlog').paginate(page, itemsPerPage, function(err, categoriesBlog, total) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!categoriesBlog) {
                res.status(404).send({ message: 'No hay categorias' });
            } else {
                res.status(200).send({ categoriesBlog: categoriesBlog });
            }
        }
    });
}

function getCategoriesBlog(req, res) {
    CategoryBlog.find({}, function(err, categoriesBlog) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!categoriesBlog) {
                res.status(404).send({ message: 'No hay testimonios' });
            } else {
                res.status(200).send({ categoriesBlog: categoriesBlog });
            }
        }
    });
}

function saveCategoryBlog(req, res) {
    var categoryBlog = new CategoryBlog();
    var params = req.body;

    categoryBlog.name = params.name;
 
    console.log(categoryBlog.name);

    categoryBlog.save((err, categoryBlogStored) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!categoryBlogStored) {
                res.status(404).send({ message: 'No se pudo guardar la habilidad' });
            } else {
                res.status(200).send({ categoryBlog: categoryBlogStored });
            }
        }
    })
}

function updateCategoryBlog(req, res) {
    var categoryBlogId = req.params.id;
    var update = req.body;

    Testimonie.findOneAndUpdate({_id: categoryBlogId}, update, {new: true}, (err, updateCategoryBlog) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!updateCategoryBlog) {
                res.status(404).send({ message: 'No se pudo actualizar' });
            } else {
                res.status(200).send({ categoryBlog: updateCategoryBlog });
            }
        }
    });
}

function deleteCategoryBlog(req, res) {
    var categoryBlogId = req.params.id;

    Testimonie.findOneAndDelete({_id:categoryBlogId, categoryBlog: res.categoryBlog}, (err, categoryBlogRemove) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!categoryBlogRemove) {
                res.status(404).send({ message: 'No se pudo eliminar la habilidad' });
            } else {
                res.status(200).send({ categoryBlog: categoryBlogRemove });
            }
        }
    });
}

module.exports = {
    getCategoryBlog,
    getCategoriesBlog,
    saveCategoryBlog,
    updateCategoryBlog,
    deleteCategoryBlog
}
