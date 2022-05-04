const Watchlist = require('../models/watchlist');
const Movie = require('../models/movie');
const mongoose = require('mongoose');

exports.watchlistGetAll = (req, res, next) => {
    Watchlist.find()
    .select('movie _id')
    .populate('movie', 'name')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            watchlist: docs.map(doc => {
                return {
                    _id: doc._id,
                    movie: doc.movie,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/movies/' + doc._id
                    }
                };
            })
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.watchlistCreateNew=(req, res, next) => {
    Movie.findById(req.body.movieId)
      .then(movie => {
        if (!movie) {
          return res.status(404).json({
            message: "Movie not found"
          });
        }
      });
      const watchlist = new Watchlist({
          _id: mongoose.Types.ObjectId(),
          movie: req.body.movieId,
          userId: req.body.userId
      });
      watchlist.save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Added to watch list",
          createdItem: {
            _id: result._id,
            movie: result.movie,
            userId: result.userId
          }
        //   request: {
        //     type: "GET",
        //     url: "http://localhost:3000/movies/" + result._id
        //   }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }

exports.watchlistGetItem = (req, res, next) => {
    Watchlist.find({creatorId : req.params.wathclistId})
    .populate('movie')
    .exec()
    .then(watchlist => {
        if(!watchlist) {
            return res.status(404).json({
                message: 'item not found'
            });
        }
        res.status(200).json({
            watchlist: watchlist,
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

exports.watchlistDelete = (req, res, next) => {
    Watchlist.remove({_id: req.params.watchlistId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'item deleted from watchlist'
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}