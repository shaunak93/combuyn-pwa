import React, { useState } from "react";
import ProductCategories from "./ProductCategories";
import ProductCard from "./ProductCard";

function ProductsByCategories({ products, campaignId }) {
  const [categories, setCategories] = useState(
    (products || [])
      .map((product) => product.category)
      .filter((category, index, arr) => {
        return arr.indexOf(category) === index;
      })
  );
  const [selectedCategory, setSelectedCategory] = useState(
    !!categories && !!categories.length && categories[0]
  );

  return (
    <div className="products-by-categories-container">
      <ProductCategories
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />
      <ProductsByCategoryPanel
        campaignId={campaignId}
        categories={categories}
        products={products}
        selectedCategory={selectedCategory}
      />
    </div>
  );
}

function ProductsByCategoryPanel({
  products,
  categories,
  selectedCategory,
  campaignId,
}) {
  let productListByCategories = categories.reduce((acc, category) => {
    acc[category] = products.filter((product) => product.category === category);
    return acc;
  }, {});
  let currentCategoriesIndex = categories.indexOf(selectedCategory);
  return (
    <div
      className="products-by-category"
      style={{
        display: "inline-block",
        marginLeft: `-${100 * currentCategoriesIndex}%`,
        width: `${100 * categories.length}%`,
      }}
    >
      {Object.values(productListByCategories).map((productList) => {
        return (
          <div
            style={{
              width: `${100 / categories.length}%`,
              height: "100%",
              display: "inline-block",
            }}
          >
            <div className="scrolling-div">
              <div style={{ width: "100%", height: "50px" }}></div>
              {productList.map((product) => (
                <ProductCard product={product} campaignId={campaignId} />
              ))}
              <div style={{ width: "100%", height: "50px" }}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductsByCategories;
