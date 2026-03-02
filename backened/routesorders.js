const express = require('express');
const router = express.Router();

// Temporary in-memory storage
let orders = [];

router.post('/', (req, res) => {
  const { customerName, items } = req.body;
  if (!customerName || !items || items.length === 0) {
    return res.status(400).json({ message: 'Invalid order data' });
  }
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const newOrder = { id: orders.length + 1, customerName, items, total };
  orders.push(newOrder);
  res.status(201).json({ message: 'Order received', order: newOrder });
});

router.get('/', (req, res) => {
  res.json(orders);
});

module.exports = router;