// frontend/src/pages/CartPage.js
import React, { useMemo, useState } from 'react';
import CartItem from '../components/CartItem';
import OrderForm from '../components/OrderForm';
import { placeOrder } from '../services/apiService';

function CartPage({ cartItems, updateQuantity, removeFromCart, clearCart }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const handlePlaceOrder = async ({ firstName, lastName, address }) => {
    if (cartItems.length === 0) {
      setStatusMessage('Your cart is empty.');
      return;
    }

    setIsSubmitting(true);
    setStatusMessage('');

    try {
      const response = await placeOrder({
        firstName,
        lastName,
        address,
        cartItems,
        total,
      });

      setStatusMessage(
        `Order placed successfully! Your order ID is ${response.orderId}.`
      );
      clearCart();
    } catch (error) {
      console.error('Error placing order:', error);
      setStatusMessage(error.message || 'Failed to place order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page">
      <h1>Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityChange={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>
          <div className="cart-summary">
            <h2>Total: ${total.toFixed(2)}</h2>
          </div>
        </>
      )}

      <OrderForm onSubmit={handlePlaceOrder} isSubmitting={isSubmitting} />

      {statusMessage && <p className="status-message">{statusMessage}</p>}
    </div>
  );
}

export default CartPage;
