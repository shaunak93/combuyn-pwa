import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ShareIcon from "@mui/icons-material/Share";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import CampaignAddress from "../components/CampaignAddress";
import { getCampaign } from "../apis/campaign";
import CampaignCatalog from "../components/CampaignCatalog";
import CampaignDetails from "../components/CampaignDetails";
import CommonHeader from "../components/headers/CommonHeader";
import CartCampaignCard from "../components/cards/CartCampaignCard";

function Cart(props) {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const { apartment, cart } = useSelector((state) => state.cart);

  return (
    <div className="cart-page">
      <CommonHeader
        onBackClick={() => {
          history.push("/home");
        }}
        title="Cart"
      />
      <div className="cart-body">
        <div className="scrolling-div">
          <div className="top-spacer"></div>
          {!!cart &&
            !!cart.length &&
            cart.map((campaign) => <CartCampaignCard campaign={campaign} />)}
          <CartCampaignCard campaign={cart[0]} />
          <CartCampaignCard campaign={cart[0]} />
          <CartCampaignCard campaign={cart[0]} />
          <CartCampaignCard campaign={cart[0]} />
          <CartCampaignCard campaign={cart[0]} />
          <CartCampaignCard campaign={cart[0]} />
          <CartCampaignCard campaign={cart[0]} />
          <div className="bottom-spacer"></div>
        </div>
      </div>
      <div className="floating-div">
        <p>Place order</p>
      </div>
    </div>
  );
}

export default Cart;
