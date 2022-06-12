import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import DeleteIcon from "@mui/icons-material/Delete";

function CartCampaignCard(props) {
  let { campaign } = props;
  let { name, campaignId, products } = campaign;

  return (
    <div className="cart-campaign-card">
      <div className="header">
        <div className="title">
          <span>{name}</span>
          <NavigateNextIcon className="icon" />
        </div>
        <div className="delete-button">
          <DeleteIcon className="icon" />
        </div>
      </div>
      <div className="ends-in">
        Ends in <span className="time">00h 00m 00s</span>
      </div>
      <div className="cost-container">
        <div className="cost">
          <div className="discounted-cost">₹ 0000</div>
          <div className="original-cost strikethrough">₹ 0000</div>
        </div>
        <div className="delivery-date">Delivery by : 00 00 0000</div>
      </div>
      <div className="item-list">
        <p>
          Dry cake x 1, Pasteries x 1, Fresh bread x 1, Dry cake x 1, Pasteries
          x 1, Fresh bread x 1, Dry cake x 1, Pasteries x 1, Fresh bread x 1
        </p>
      </div>
      <div className="purchased-by-container">
        Also purchased by 8 other in your apartment.
      </div>
    </div>
  );
}

export default CartCampaignCard;
