const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../auth/check-auth');
const MovieController = require('../controllers/movies');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage, 
    limits: {
    fileSize : 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


router.get('/', MovieController.moviesGetAll);

// create new movies
router.post('/', checkAuth, upload.single('coverImage'), MovieController.moviesCreate);

router.get('/:movieId', MovieController.moviesGetOne);

router.patch('/:movieId', checkAuth, MovieController.moviesUpdate);

router.delete('/:movieId', checkAuth, MovieController.moviesDelete);

module.exports = router;