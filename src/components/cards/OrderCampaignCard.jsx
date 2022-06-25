import React from "react";
import ShareIcon from "@mui/icons-material/Share";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { getHumanReadableDate } from "../../utils/general";

const getActionbuttons = (state) => {
  switch (state) {
    case "delivered":
      return [
        <p>Cancel order</p>,
        <div className="divider"></div>,
        <p>Raise query</p>,
      ];
    case "outForFelivery":
      return <p>Raise query</p>;
    case "orderAccepted":
    case "Accepted":
      return <p>Review order</p>;
    default:
      return "";
  }
};

function OrderCampaignCard({ order }) {
  let { createdAt, campaigns, status, orderId } = order;
  let { name, deliveryDate, products, alsoPurchasedBy, outOfStockDetails } =
    campaigns[0];
  let productsNameString = products.map((product) => product.name).join(", ");
  return (
    <div className="order-capaign-card">
      <div className="header">
        <div className="title">
          <span>{name}</span>
          <NavigateNextIcon className="icon" />
        </div>
        <div className="status">
          Status : <span>{status}</span>
        </div>
        <div className="share-button">
          Share <ShareIcon className="icon" />
        </div>
      </div>
      <div className="item-list">
        <p>Items ordered : {productsNameString}</p>
      </div>
      {alsoPurchasedBy && (
        <div className="purchased-by-container">
          <p>Also purchased by</p>
          <p style={{ fontWeight: "bold", fontSize: "10px" }}>{10}</p>
        </div>
      )}

      <div className="date-container">
        {!!createdAt && <p>Ordered date : {getHumanReadableDate(createdAt)}</p>}
        {!!deliveryDate && (
          <p>Delivery date : {getHumanReadableDate(deliveryDate)}</p>
        )}
      </div>
      <div className="actions-container">{getActionbuttons("delivered")}</div>
      {!!outOfStockDetails && (
        <div className="outofstock-container">
          <p>
            Out of stock details:
            <span>
              item1, item2, item1, item2, item1, item2, item1, item2, item1,
              item2, item1, item2,
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default OrderCampaignCard;
