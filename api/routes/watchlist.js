const express = require('express');
const router = express.Router();
const checkAuth = require('../auth/check-auth');
const WatchlistController = require('../controllers/watchlist');

router.get('/', checkAuth, WatchlistController.watchlistGetAll);

router.post('/', checkAuth, WatchlistController.watchlistCreateNew);

router.get('/:watchlistId', checkAuth, WatchlistController.watchlistGetItem);

router.delete('/:watchlistId', checkAuth, WatchlistController.watchlistDelete);

module.exports = router;