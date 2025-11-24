// frontend/src/pages/OrdersPage.js
import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../services/apiService';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  if (!orders.length) {
    return <p>No orders yet. Place your first order!</p>;
  }

  return (
    <div className="page">
      <h1>My Orders</h1>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-card__header">
              <h3>Order #{order.id}</h3>
              <span>{order.status}</span>
            </div>
            <p>
              <strong>Name:</strong> {order.firstName} {order.lastName}
            </p>
            <p>
              <strong>Address:</strong> {order.address}
            </p>
            <p>
              <strong>Total:</strong> ${order.total.toFixed(2)}
            </p>
            <p className="order-card__date">
              <strong>Date:</strong>{' '}
              {new Date(order.createdAt).toLocaleString()}
            </p>

            <div className="order-card__items">
              {order.cartItems.map((item) => (
                <div key={item.id} className="order-card__item">
                  <span>{item.name}</span>
                  <span>
                    {item.quantity} × ${item.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;
