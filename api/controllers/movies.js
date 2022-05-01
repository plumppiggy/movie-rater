const Movie = require('../models/movie');
const mongoose = require('mongoose');
const User = require('../models/user');

exports.moviesGetAll = (req, res, next) => {
    Movie.find()
    .select('name creatorId rating _id coverImage')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            movies: docs.map(doc => {
                return {
                    name: doc.name,
                    rating: doc.rating,
                    _id: doc._id,
                    creatorId: doc.creatorId,
                    //coverImage: doc.coverImage,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/movies/' + doc._id
                    }
                }
            })
        }
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.moviesCreate = (req, res, next) => {
    const movie = new Movie({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        rating: req.body.rating,
        creatorId: req.body.userId
        //coverImage: req.file.path
    });
    movie
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Created Movie',
            createdMovie: {
                name: result.name,
                rating: result.rating,
                _id: result._id,
                creatorId: result.creatorId,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/movies/' + result._id
                }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
}

exports.moviesGetOne = (req, res, next) => {
    const id = req.params.movieId;
    Movie.findById(id)
    .select('name rating _id coverImage')
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc) {
            res.status(200).json({
                movie: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/movies/' + doc._id
                }
            });
        } else {
            res.status(404).json({
                message: "No Valid ID"
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    })
}

exports.moviesUpdate = (req, res, next) => {
    const id = req.params.movieId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Movie.update({_id : id}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: "movie updated",
            request: {
                type: 'GET',
                url: 'http://localhost:3000/movies/' + result._id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
}

exports.moviesDelete = (req, res, next) => {
    const id = req.params.movieId;
    Movie.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'movie deleted'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
} 