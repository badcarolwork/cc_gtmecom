import React from "react";
import { useCart } from "../cart/CartContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { product_name, price, images, description, stock_status } = product;
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product);
    navigate("/checkout");
  };

  return (
    <div className="card h-100">
      <img
        src={images[0].image_url}
        alt={images[0].alt_text}
        className="card-img-top"
      />
      <div className="card-body">
        <h5 className="card-title">{product_name}</h5>
        <p className="card-text">{description}</p>
        <p className="text-muted">
          Price: {price.currency} {price.regular_price}
        </p>
        <p
          className={`badge ${
            stock_status === "in_stock" ? "bg-success" : "bg-danger"
          }`}
        >
          {stock_status}
        </p>
      </div>
      <div className="card-footer">
        <button
          onClick={handleAddToCart}
          id="addCart"
          className="btn btn-primary addCart"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
