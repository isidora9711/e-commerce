import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";

const Checkout = () => {
  const {
    cartItems,
    all_product,
    getTotalCartTotal,
    removeFromCart,
    addToCart,
  } = useContext(ShopContext);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Checkout</h1>
      <ul>
        {all_product.map((product, index) =>
          cartItems[index] > 0 ? (
            <li key={index} style={{ marginBottom: "15px" }}>
              <span>{product.name} - </span>
              <span>
                {cartItems[index]} x {product.price}€ ={" "}
                {(cartItems[index] * product.price).toFixed(2)}€
              </span>
              <button onClick={() => addToCart(index)}>+</button>
              <button onClick={() => removeFromCart(index)}>-</button>
            </li>
          ) : null
        )}
      </ul>
      <h2>Total: {getTotalCartTotal()}€</h2>
      <button style={{ marginTop: "20px", padding: "10px 20px" }}>
        Pay Now
      </button>
    </div>
  );
};

export default Checkout;
