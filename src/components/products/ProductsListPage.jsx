import React from "react";
import { useParams } from "react-router-dom";
import ProductList from "./ProductList";
import datas from "../../datas.json";

const ProductsPage = () => {
  const { cat_id } = useParams(); // Retrieve cat_id from the URL

  return (
    <div className="container mt-5">
      <h2>Products</h2>
      <ProductList products={datas.products} selectedCategory={cat_id} />
    </div>
  );
};

export default ProductsPage;
