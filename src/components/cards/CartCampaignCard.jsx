import React from "react";
import { useDispatch } from "react-redux";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTimeLeft } from "../../hooks/hooks";
import { removeCampaign } from "../../store/actions/cartActions";

function CartCampaignCard(props) {
  let { campaignInCart } = props;
  console.log({ campaignInCart });
  let { campaignId, campaignDetails, products } = campaignInCart;
  let { name, startTime, endTime, deliveryTime } = campaignDetails;
  const dispatch = useDispatch();

  let itemList = products.map(
    (product) => `${product.name} X ${product.quantity}`
  );
  let itemListString = itemList.join(", ");

  const { timeLeftToEndString, timeLeftToDeliveryString } = useTimeLeft({
    startTime,
    endTime,
    deliveryTime,
  });

  const removeCampaignFromCart = () => {
    dispatch(removeCampaign({ campaignId }));
  };

  return (
    <div className="cart-campaign-card">
      <div className="header">
        <div className="title">
          <span>{name}</span>
          <NavigateNextIcon className="icon" />
        </div>
        <div className="delete-button" onClick={removeCampaignFromCart}>
          <DeleteIcon className="icon" />
        </div>
      </div>
      <div className="ends-in">
        Ends in <span className="time">{timeLeftToEndString}</span>
      </div>
      <div className="cost-container">
        <div className="cost">
          <div className="discounted-cost">₹ 0000</div>
          <div className="original-cost strikethrough">₹ 0000</div>
        </div>
        <div className="delivery-date">{`Delivery by : ${timeLeftToDeliveryString}`}</div>
      </div>
      <div className="item-list">
        <p>{itemListString}</p>
      </div>
      <div className="purchased-by-container">
        Also purchased by 8 other in your apartment.
      </div>
    </div>
  );
}

export default CartCampaignCard;
