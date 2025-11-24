// backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getAllOrders,
  getOrderById,
} = require('../controllers/orderController');
const { validateOrder } = require('../utils/validationMiddleware');

// POST /api/orders
router.post('/', validateOrder, placeOrder);

// GET /api/orders
router.get('/', getAllOrders);

// GET /api/orders/:id
router.get('/:id', getOrderById);

module.exports = router;
