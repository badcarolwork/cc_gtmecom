import React from "react";
import ProductList from "../products/ProductList";
import data from "../../datas.json";
import Carousel from "../carousel/Carousel";

const HomePage = () => {
  return (
    <div>
      <Carousel />
      <div className="container mt-5">
        <div className="top-cat">
          <h2>新品上市</h2>
          <ProductList
            products={data.products}
            selectedCategory="newproduct"
          ></ProductList>
        </div>
        <div className="top-cat">
          <h2>經典暢銷</h2>
          <ProductList
            products={data.products}
            selectedCategory="cleanser"
          ></ProductList>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
