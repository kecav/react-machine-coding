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

  return (
    <div className="product">
      <img src={image} alt="title" />
      <div className="title">
        <strong>
          {newTitle.map((word, index) => {
            const className = search && word === search ? "select" : "";
            return (
              <span key={index} className={className}>
                {word}
              </span>
            );
          })}
        </strong>
        <strong>${price}</strong>
      </div>
      {/* {isAddedToCart ? (s
        <button onClick={() => removeFromCart(id)}>Remove From Cart</button>
      ) : (
        <button onClick={() => addToCart(id)}> Add To Cart</button>
      )} */}
    </div>
  );
};

const Products = ({ products }) => {
  return (
    <div className="products">
      {products.map((prod, ind) => {
        return (
          <Product
            // id={prod.id}
            image={prod?.thumbnail}
            price={prod.price}
            title={prod.title}
            key={prod.id}
          />
        );
      })}
    </div>
  );
};

export default Products;
