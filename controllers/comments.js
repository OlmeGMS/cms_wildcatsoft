'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Comments = require('../models/comments');


function getComment(req, res) {
    var commentId = req.params.id;

    Comments.findById(commentId, (err, comment) => {
        if (err) {
            res.status(500).send({ message: ' Error en la petición' });
        } else {
            if (!comment) {
                res.status(404).send({ message: 'La sección de comentarios no existe' });
            } else {
                res.status(200).send({ comment })
            }
        }
    });
}

function getComments(req, res) {
    var blogId = req.params.blog;

    if (!blogId) {
        var find = Comments.find({}).sort('number');
    } else {
        var find = Comments.find({ blog: blogId }).sort('number');

    }

    find.populate({
        path: 'blog',
        populate: {
            path: 'comment',
            model: 'Comments'
        }
    }).exec(function(err, comments) {
        if (err) {
            res.status(500).send({ message: 'ERROR: No se pudo realizar la petición' });
        } else {
            if (!comments) {
                res.status(404).send({ message: 'ERROR: No extite el blog' });
            } else {
                res.status(200).send({ comments });
            }
        }
    });

}

function getListComments(req, res) {
    Comments.find({}, function(err, comments) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!comments) {
                res.status(404).send({ message: 'No hay comentarios' });
            } else {
                res.status(200).send({ comments: comments });
            }
        }
    });
}

function saveComment(req, res) {
    var comments = new Comments();
    var params = req.body;

    comments.blog = params.blog;
    comments.user = params.user;
    comments.texto_comments = params.texto_comments;
    comments.date_comments = params.date_comments;
    comments.reply_comments = params.reply_comments;



    comments.save((err, commentStored) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!commentStored) {
                res.status(404).send({ message: 'No se pudo guardar el comentario' });
            } else {
                res.status(200).send({ contact: commentStored });
            }
        }
    })
}

function updateComment(req, res) {
    var commentId = req.params.id;
    var update = req.body;

    Comments.findOneAndUpdate({_id: commentId}, update, {new: true}, (err, commentUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!commentUpdate) {
                res.status(404).send({ message: 'No se pudo actualizar' })
            } else {
                res.status(200).send({ comment: coommentUpdate });
            }
        }
    });
}

function deleteComment(req, res) {
    var commentId = req.params.id;

    Comment.findOneAndDelete({_id: commentId, comment: res.comment}, (err, commentRemove) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!commentRemove) {
                res.status(404).send({ message: 'No se pudo eliminar el contacto' });
            } else {
                res.status(200).send({ comment: commentRemove });
            }
        }
    });
}

module.exports = {
    getComment,
    getComments,
    getListComments,
    saveComment,
    updateComment,
    deleteComment
}