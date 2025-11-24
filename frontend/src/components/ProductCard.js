// frontend/src/components/ProductCard.js
import React from 'react';

function ProductCard({ product, addToCart }) {
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-card card">
      <div className="card-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="card-content">
        <h3 className="card-title">{product.name}</h3>
        <p className="card-description">{product.description}</p>

        <div className="card-footer">
          <span className="card-price">${product.price.toFixed(2)}</span>
          <button className="add-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
