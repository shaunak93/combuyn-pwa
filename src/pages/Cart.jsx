import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CommonHeader from "../components/headers/CommonHeader";
import CartCampaignCard from "../components/cards/CartCampaignCard";

function Cart(props) {
  const history = useHistory();
  const { cart } = useSelector((state) => state.cart);

  //const {quantity, totalCost}

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
          {!!cart && !!cart.length ? (
            <>
              {cart.map((campaign) => (
                <CartCampaignCard campaignInCart={campaign} />
              ))}
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}

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
