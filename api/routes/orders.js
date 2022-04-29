const express = require('express');
const router = express.Router();
const checkAuth = require('../auth/check-auth');
const OrdersController = require('../controllers/orders');

router.get('/', checkAuth, OrdersController.ordersGetAll);

router.post('/', checkAuth, OrdersController.ordersCreateOrder);

router.get('/:orderId', checkAuth, OrdersController.ordersGetOrder);

router.delete('/:orderId', checkAuth, OrdersController.ordersDelete);

module.exports = router;