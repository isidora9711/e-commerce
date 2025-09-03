import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/Admin_Assets/cross_icon.png";

const CartItmes = () => {
  const { all_product, cartItems, removeFromCart } = useContext(ShopContext);

  return (
    <div className="cartitems">
      <div className="cartitems-header">
        <p className="cartitems-header-products">Products</p>
        <p className="cartitems-header-item">Title</p>
        <p className="cartitems-header-item">Price</p>
        <p className="cartitems-header-item">Quantity</p>
        <p className="cartitems-header-item">Total</p>
        <p className="cartitems-header-item">Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id} className="cartitem-row">
              <img src={e.image} alt={e.name} className="cartitem-image" />
              <div className="cartitem-info">
                <p className="cartitem-title">{e.name}</p>
                <p className="cartitem-description">{e.description}</p>
              </div>

              <p className="cartitem-price">${e.new_price}</p>
              <button className="cartitem-quantity" disabled>
                {cartItems[e.id]}
              </button>
              <p className="cartitem-total">
                ${(e.new_price * cartItems[e.id]).toFixed(2)}
              </p>
              <img
                className=" cartitems-remove-icon"
                src={remove_icon}
                onClick={() => {
                  removeFromCart(e.id);
                }}
                alt="Remove"
              />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default CartItmes;
