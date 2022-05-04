const mongoose = require('mongoose');

const watchlistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true},
    creatorId: {type : mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Watchlist', watchlistSchema);