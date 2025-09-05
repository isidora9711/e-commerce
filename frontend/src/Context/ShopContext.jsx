import React, { createContext, useState, useEffect } from "react";
import all_product from "../Components/Assets/Frontend_Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < all_product.length; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    console.log(cartItems); // Παρακολουθεί τις αλλαγές του cart
  }, [cartItems]);

  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev, [itemId]: prev[itemId] + 1 };
      console.log(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) };
      return updatedCart;
    });
  };

  // 🟢 Νέα συνάρτηση: Υπολογίζει το σύνολο των προϊόντων στο cart
  const getTotalCartItems = () => {
    let total = 0;
    for (const item in cartItems) {
      total += cartItems[item];
    }
    return total;
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
