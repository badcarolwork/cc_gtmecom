import React from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price.regular_price,
    0
  );

  const handlePayment = () => {
    // Prepare data for each product
    const productsData = cart.map((item) => ({
      id: item.product_id,
      name: item.product_name,
      price: item.price.regular_price,
      quantity: 1, // Assuming 1 as quantity for simplicity, adjust if necessary
    }));

    // Push to GTM data layer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "makePayment",
      ecommerce: {
        currencyCode: cart.length > 0 ? cart[0].price.currency : "TWD",
        purchase: {
          products: productsData,
          total: totalAmount,
        },
      },
    });

    // Optional: Trigger payment flow (e.g., redirect to payment gateway)
    navigate("/payment");
  };
  return (
    <div className="container mt-5 checkout">
      <h2>Checkout</h2>
      <ul className="list-group">
        {cart.map((item, index) => (
          <li key={index} className="list-group-item checkout-list">
            <img
              src={item.images[0].image_url}
              alt={item.images[0].alt_text}
              className="checkout-img"
            />
            <div className="cart-item-detail">
              <h5>{item.product_name}</h5>
              <p>
                Price: {item.price.currency} {item.price.regular_price}
              </p>
              <p>Quantity: 1</p>
            </div>
            <button
              id="removeItem"
              className="cart-remove"
              onClick={() => removeFromCart(item.product_id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="total-amount">
        <h4>
          Total Amount: {cart.length > 0 ? cart[0].price.currency : ""}{" "}
          {totalAmount}
        </h4>
      </div>
      <button
        id="makePayment"
        className="payment-btn btn btn-outline-success"
        onClick={handlePayment}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-credit-card-2-back"
          viewBox="0 0 16 16"
        >
          <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5z" />
          <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1m-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1" />
        </svg>
        Make Payment
      </button>
    </div>
  );
};

export default CheckoutPage;
