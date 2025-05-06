import React from "react";

const Cart = ({
  image,
  title,
  price,
  index,
  id,
  removeFromCart,
  quantity,
  addToCart,
}) => {
  return (
    <div className="cart-item" key={index}>
      <img src={image} alt={title} className="cart-item" />
      {/* <span>{index + 1}</span> */}

      <p className="title">{title}</p>

      <div className="metadata">
        <strong className="price">${price}</strong>
        <strong> Quantity : {quantity}</strong>
      </div>

      <div className="cart-buttons">
        <button onClick={() => removeFromCart(id)}> Remove</button>
        <button onClick={() => addToCart(id)}> Add(+1)</button>
      </div>
    </div>
  );
};

export default Cart;
