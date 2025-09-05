import React, { useContext, useState } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/Frontend_Assets/star_icon.png";
import star_dull_icon from "../Assets/Frontend_Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  const [selectedSize, setSelectedSize] = useState(null);
  const sizes = ["S", "M", "L", "XL", "XXL"];

  return (
    <div className="productdisplay">
      {/* Left side with images */}
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-main-img">
          <img src={product.image} alt="" />
        </div>
      </div>

      {/* Right side with details */}
      <div className="productdisplay-right">
        <h1>{product.name}</h1>

        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>

        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product.new_price}
          </div>
        </div>

        <div className="productdisplay-right-description">
          A lightweight, usually knitted, pullover shirt, close-fitting with a
          round neckline and short sleeves.
        </div>

        {/* Sizes */}
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="sizes-container">
            {sizes.map((size) => (
              <div
                key={size}
                className={`size-box ${selectedSize === size ? "active" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            if (selectedSize) {
              addToCart(product.id);
              console.log("Added to cart with size:", selectedSize);
            } else {
              alert("Please select a size before adding to cart!");
            }
          }}
        >
          ADD TO CART
        </button>

        <p className="productdisplay-right-category">
          <span>Category:</span> Women , T-shirt , Crop Top
        </p>
        <p className="productdisplay-right-category">
          <span>Tags:</span> Modern, Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
