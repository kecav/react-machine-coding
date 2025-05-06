import React from "react";

const Product = ({
  title,
  image,
  price,
  addToCart,
  removeFromCart,
  isAddedToCart,
  id,
  search,
}) => {
  let newTitle = search ? title.split(search) : [title];
  if (search) {
    newTitle.splice(1, 0, search);
  }

  console.log(newTitle);
  return (
    <div className="product">
      <img src={image} alt="title" />
      <div className="title">
        <strong>
          {newTitle.map((word, index) => {
            const className = search && word === search ? "select" : "";
            return (
              <span id={index} className={className}>
                {word}
              </span>
            );
          })}
        </strong>
        <strong>${price}</strong>
      </div>
      {isAddedToCart ? (
        <button onClick={() => removeFromCart(id)}>Remove From Cart</button>
      ) : (
        <button onClick={() => addToCart(id)}> Add To Cart</button>
      )}
    </div>
  );
};

export default Product;
