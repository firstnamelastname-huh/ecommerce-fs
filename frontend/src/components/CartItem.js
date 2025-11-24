// frontend/src/components/CartItem.js
import React from 'react';

function CartItem({ item, onQuantityChange, onRemove }) {
  const handleChange = (e) => {
    onQuantityChange(item.id, Number(e.target.value));
  };

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />
      <div className="cart-item__info">
        <h3>{item.name}</h3>
        <p>Price: ${item.price.toFixed(2)}</p>
        <div className="cart-item__actions">
          <label>
            Qty:
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={handleChange}
            />
          </label>
          <button type="button" onClick={() => onRemove(item.id)}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
