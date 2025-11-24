import React from 'react';

function Cart({ cartItems, handleQuantityChange, handleRemove, handleOrder }) {
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart">
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              <span>{item.name}</span>
              <span>${item.price}</span>
              <input
                type="number"
                value={item.quantity}
                onChange={e => handleQuantityChange(item.id, e.target.value)}
              />
              <button onClick={() => handleRemove(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <div>
        <h2>Total: ${totalPrice}</h2>
        <form onSubmit={handleOrder}>
          <input type="text" name="firstName" placeholder="First Name" required />
          <input type="text" name="lastName" placeholder="Last Name" required />
          <input type="text" name="address" placeholder="Address" required />
          <button type="submit">Place Order</button>
        </form>
      </div>
    </div>
  );
}

export default Cart;
