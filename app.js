const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const movieRoutes = require('./api/routes/movies');
const watchlistRoutes = require('./api/routes/watchlist');
const userRoutes = require('./api/routes/user');

mongoose.connect(
    "mongodb+srv://elysia:nodeshop@node-rest-shop.2bdtc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
// deprication warning
// mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// star allows anyone
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
     if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, OPTIONS');
        return res.status(200).json({});
     }
     next();
});

// handles requests
app.use('/movies', movieRoutes);
app.use('/watchlist', watchlistRoutes);
app.use('/user', userRoutes);

// error handling
app.use((req, res, next) => {
    const error = new Error('Page Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;