// backend/controllers/orderController.js
const fs = require('fs');
const path = require('path');

const ordersFilePath = path.join(__dirname, '..', 'data', 'orders.json');

function readOrdersFromFile() {
  try {
    if (!fs.existsSync(ordersFilePath)) {
      return [];
    }
    const raw = fs.readFileSync(ordersFilePath, 'utf-8');
    if (!raw.trim()) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading orders file:', err);
    throw err;
  }
}

function writeOrdersToFile(orders) {
  try {
    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));
  } catch (err) {
    console.error('Error writing orders file:', err);
    throw err;
  }
}

exports.placeOrder = (req, res) => {
  const { firstName, lastName, address, cartItems, total } = req.body;

  try {
    const orders = readOrdersFromFile();

    const newOrder = {
      id: orders.length ? orders[orders.length - 1].id + 1 : 1,
      firstName,
      lastName,
      address,
      cartItems,
      total,
      status: 'PENDING', // simple status field
      createdAt: new Date().toISOString(),
    };

    orders.push(newOrder);
    writeOrdersToFile(orders);

    console.log('Order placed:', newOrder);

    return res.status(201).json({
      message: 'Order placed successfully!',
      orderId: newOrder.id,
    });
  } catch (error) {
    console.error('Error placing order:', error);
    return res.status(500).json({ error: 'Failed to place order.' });
  }
};

exports.getAllOrders = (req, res) => {
  try {
    const orders = readOrdersFromFile();
    return res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ error: 'Failed to fetch orders.' });
  }
};

exports.getOrderById = (req, res) => {
  const { id } = req.params;
  try {
    const orders = readOrdersFromFile();
    const order = orders.find((o) => o.id === Number(id));

    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    return res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return res.status(500).json({ error: 'Failed to fetch order.' });
  }
};
