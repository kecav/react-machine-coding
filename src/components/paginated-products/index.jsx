import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Products from "./Products";
import "./style.css";
import json from "./products.json";

const productsPerPage = 10;

const PaginatedProducts = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);

  const fetchProducts = async () => {
    // const response = await fetch(`https://dummyjson.com/products?limit=100`);
    // const data = await response.json();
    const data = json;
    console.log(data);
    setProducts(data?.products || []);
    setTotalPages(Math.ceil(data?.products.length / productsPerPage));
  };

  useEffect(() => {
    const newProducts = products.slice(
      currentPage * productsPerPage,
      (currentPage + 1) * productsPerPage
    );

    setVisibleProducts(newProducts);
  }, [currentPage, products]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="paginated-products">
      <h4>Paginated Products</h4>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
      <Products products={visibleProducts} />
    </div>
  );
};

export default PaginatedProducts;
