import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTimeLeft } from "../hooks/hooks";
import Button from "@mui/material/Button";
import ShareIcon from "@mui/icons-material/Share";
import ImageSlider from "./ImageSlider";
import Rating from "@mui/material/Rating";
import ProductCategories from "./ProductCategories";
import ProductCard from "./ProductCard";
import ProductsByCategories from "./ProductsByCategories";

const getCategories = (products = []) => {
  let categories = new Set();
  products.forEach((product) => {
    categories.add(product.category);
  });
  return Array.from(categories);
};

function CampaignCatalog({ campaign, products }) {
  const history = useHistory();
  let { name, startTime, endTime, description, id: campaignId } = campaign;

  const [catagories] = useState(getCategories(products));
  const [selectedCategory, setSelectedCategory] = useState(
    catagories.length && catagories[0]
  );

  const { timeLeftToStartString, timeLeftToEndString } = useTimeLeft({
    startTime,
    endTime,
  });

  let { totalCampaignQuantity, totalCampaignCost } = useSelector(
    getCampaignQuantityAndCost
  );

  function getCampaignQuantityAndCost({ cart }) {
    let totalCampaignQuantity = 0,
      totalCampaignCost = 0;
    if (cart?.cart) {
      let campaignInCart = cart.cart.find(
        ({ campaignId: id }) => id === campaignId
      );
      if (campaignInCart) {
        if (campaignInCart.products && campaignInCart.products.length) {
          campaignInCart.products.forEach((product) => {
            totalCampaignQuantity =
              totalCampaignQuantity + (product?.quantity || 0);
            totalCampaignCost =
              totalCampaignCost +
              (product?.quantity || 0) * (product?.price || 0);
          });
        }
      }
    }
    return { totalCampaignQuantity, totalCampaignCost };
  }

  const goToCart = () => {
    history.push("/cart");
  };

  return (
    <div className="campaign-catalog">
      <div className="header">
        <span className="label">{name}</span>
      </div>
      <div className="ribbon-panel">
        <span key="time-left-label" className="time-left-label">
          Ends in {timeLeftToEndString}
        </span>
        <Button
          variant="outlined"
          startIcon={<ShareIcon />}
          className="share-button"
        >
          Share
        </Button>
      </div>
      <ProductsByCategories products={products} campaignId={campaignId} />
      {/* <CategoriesTabs
                categories={catagories}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
            />
            <ProductsByCategoryPanel
                categories={catagories}
                products={products}
            />
            <div className="scrolling-div">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <br />
                <br />
            </div> */}
      {!!totalCampaignQuantity && (
        <div className="floating-div" onClick={goToCart}>
          <p>{`${totalCampaignQuantity} items | ₹ ${totalCampaignCost}`}</p>
          <p>{"Continue >"}</p>
        </div>
      )}
    </div>
  );
}

export default CampaignCatalog;
