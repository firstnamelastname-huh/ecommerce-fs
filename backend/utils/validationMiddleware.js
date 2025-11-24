// backend/utils/validationMiddleware.js
exports.validateOrder = (req, res, next) => {
  const { firstName, lastName, address, cartItems, total } = req.body;

  if (!firstName || !lastName || !address) {
    return res
      .status(400)
      .json({ error: 'First name, last name and address are required.' });
  }

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ error: 'Cart items are required.' });
  }

  if (typeof total !== 'number' || total <= 0) {
    return res
      .status(400)
      .json({ error: 'Total must be a positive number.' });
  }

  return next();
};
