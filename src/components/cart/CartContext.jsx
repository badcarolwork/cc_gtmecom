// CartContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Initialize the cart state with data from localStorage if it exists
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sync cart changes to localStorage whenever the cart state updates
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Function to add items to the cart
  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);

    // Push to GTM data layer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "addToCart",
      ecommerce: {
        currencyCode: item.price.currency,
        add: {
          products: [
            {
              id: item.product_id,
              name: item.product_name,
              price: item.price.regular_price,
              quantity: 1,
            },
          ],
        },
      },
    });
  };

  const removeFromCart = (product_id) => {
    const updatedCart = cart.filter((item) => item.product_id !== product_id);
    setCart(updatedCart);

    // Optional: You can also push to GTM data layer for "remove from cart" event
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "removeFromCart",
      ecommerce: {
        remove: {
          products: [
            {
              id: product_id,
            },
          ],
        },
      },
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
