import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products, selectedCategory }) => {
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category_id === selectedCategory)
    : products;

  return (
    <div className="product-list row">
      {filteredProducts.map((product) => (
        <div key={product.product_id} className="col-md-4 mb-4">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
