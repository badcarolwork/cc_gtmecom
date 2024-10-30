import React from "react";

const CategoryList = ({ categories, setSelectedCategory }) => {
  return (
    <div className="category-list d-flex flex-wrap mb-4">
      {categories.map((category) => (
        <button
          key={category.cat_id}
          className="btn btn-outline-primary m-2"
          onClick={() => setSelectedCategory(category.cat_id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryList;
