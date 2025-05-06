import React, { useEffect, useState } from "react";
import Product from "./Product";
import Cart from "./Cart";
import "./style.css";
import axios from "axios";

const dummy = [
  {
    id: 167,
    title: "300 Touring",
    price: 28999.99,
    thumbnail:
      "https://cdn.dummyjson.com/products/images/vehicle/300%20Touring/thumbnail.png",
  },
  {
    id: 99,
    title: "Amazon Echo Plus",
    price: 99.99,
    thumbnail:
      "https://cdn.dummyjson.com/products/images/mobile-accessories/Amazon%20Echo%20Plus/thumbnail.png",
  },
  {
    id: 137,
    title: "American Football",
    price: 19.99,
    thumbnail:
      "https://cdn.dummyjson.com/products/images/sports-accessories/American%20Football/thumbnail.png",
  },
  {
    id: 11,
    title: "Annibale Colombo Bed",
    price: 1899.99,
    thumbnail:
      "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/thumbnail.png",
  },
  {
    id: 12,
    title: "Annibale Colombo Sofa",
    price: 2499.99,
    thumbnail:
      "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Sofa/thumbnail.png",
  },
  {
    id: 16,
    title: "Apple",
    price: 1.99,
    thumbnail:
      "https://cdn.dummyjson.com/products/images/groceries/Apple/thumbnail.png",
  },
  {
    id: 101,
    title: "Apple AirPods Max Silver",
    price: 549.99,
    thumbnail:
      "https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20AirPods%20Max%20Silver/thumbnail.png",
  },
  {
    id: 100,
    title: "Apple Airpods",
    price: 129.99,
    thumbnail:
      "https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Airpods/thumbnail.png",
  },
  {
    id: 102,
    title: "Apple Airpower Wireless Charger",
    price: 79.99,
    thumbnail:
      "https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Airpower%20Wireless%20Charger/thumbnail.png",
  },
  {
    id: 103,
    title: "Apple HomePod Mini Cosmic Grey",
    price: 99.99,
    thumbnail:
      "https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20HomePod%20Mini%20Cosmic%20Grey/thumbnail.png",
  },
];

const ProductBill = () => {
  // const [mainProduct, setMainProduct] = useState(dummy);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [totalBill, setTotalBill] = useState(0);

  const getProductFetch = async () => {
    const data = await fetch(
      "https://dummyjson.com/products?limit=10&select=title,price,id,thumbnail&sortBy=title&order=asc"
    );
    const { products: fetchedProducts } = await data.json();
    setProducts(fetchedProducts);
  };

  const getProductAxios = async () => {
    const { data } = await axios.get(
      "https://dummyjson.com/products?limit=10&select=title,price,id,thumbnail&sortBy=title&order=asc"
    );
    setProducts(data.products);
  };

  const addToCart = (id) => {
    const prod = products.find((p) => p.id.toString() === id.toString());
    if (!prod) return;

    const cartIndex = cart.findIndex((p) => p.id.toString() === id.toString());
    const newCart = [...cart];

    if (cartIndex == -1) {
      newCart.push({
        id: prod.id.toString(),
        title: prod.title,
        quantity: 1,
        image: prod.thumbnail,
        amount: prod.price,
        price: prod.price,
      });
    } else {
      newCart[cartIndex].quantity += 1;
      newCart[cartIndex].amount += newCart[cartIndex].price;
    }
    setCart(newCart);
  };

  const removeFromCart = (id) => {
    const cartIndex = cart.findIndex((p) => p.id === id);
    if (cartIndex === -1) return;

    const newCart = [...cart];
    newCart[cartIndex].quantity -= 1;
    newCart[cartIndex].amount -= newCart[cartIndex].price;

    if (newCart[cartIndex].quantity === 0) {
      setCart(newCart.filter((p) => p.id !== id));
    } else {
      setCart(newCart);
    }
  };

  const searchHandler = (e) => {
    const input = e.target.value;
    setSearch(input);
  };

  useEffect(() => {
    const billAmount = cart.reduce((acc, { amount }) => {
      return Number(acc + amount);
    }, 0);

    setTotalBill(billAmount.toFixed(2));
  }, [cart]);

  useEffect(() => {
    if (search)
      setProducts(dummy.filter((prod) => prod.title.includes(search)));
    else setProducts(dummy);
  }, [search]);

  useEffect(() => {
    // getProductFetch();
    // getProductAxios();
    setProducts(dummy);
  }, []);

  return (
    <div className="products-parent">
      <div className="">
        <div className="search">
          <input
            type="text"
            name=""
            id=""
            onChange={searchHandler}
            value={search}
          />
        </div>
        <div className="products">
          {products.map((prod) => {
            return (
              <Product
                key={prod.id}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                image={prod.thumbnail}
                price={prod.price}
                id={prod.id}
                title={prod.title}
                isAddedToCart={cart.some((cartProd) => cartProd.id == prod.id)}
                search={search}
              />
            );
          })}
        </div>
      </div>
      <div className="cart">
        <div className="cart-items">
          <div className="cart-header">
            <div className="h3">CART</div>
            <div className="strong">{totalBill}</div>
          </div>
          {cart.map((prod, index) => {
            return (
              <Cart
                key={prod.id}
                index={index}
                removeFromCart={removeFromCart}
                image={prod.image}
                price={prod.price}
                title={prod.title}
                quantity={prod.quantity}
                addToCart={addToCart}
                id={prod.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductBill;
