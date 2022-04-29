const express = require('express');
const router = express.Router();
const { update } = require('../models/product');
const multer = require('multer');
const checkAuth = require('../auth/check-auth');
const ProductController = require('../controllers/products');

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

const Product = require('../models/product');

router.get('/', ProductController.productsGetAll);

// create new products
router.post('/', checkAuth, upload.single('productImage'), ProductController.productsCreate);

router.get('/:productId', ProductController.productsGetOne);

router.patch('/:productId', checkAuth, ProductController.productsUpdate);

router.delete('/:productId', checkAuth, ProductController.productsDelete);

module.exports = router;