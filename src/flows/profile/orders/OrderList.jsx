import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BackArrow from "../../../assets/backArrow.png";
import { getFulfilledPecentage } from "../../campaign/products/utils";
import { getHumanReadableDate } from "../../../utils/general";
import { getOrderList } from "../../../apis/orders";
import { showToast } from "../../../utils/general";

import OrderCampaignCard from "../../../components/cards/OrderCampaignCard";

let myStorage = window.localStorage;
let orderStatusMapString = myStorage.getItem("order_status");

const humanReadableStatus = (status) => {
  let orderStatusMap = JSON.parse(orderStatusMapString);
  let statusStr = orderStatusMap[status];
  let str = statusStr.split("_").map((partStr) => {
    return partStr.charAt(0).toUpperCase() + partStr.slice(1).toLowerCase();
  });
  return str.join(" ");
};

const getOrderCard = (order) => {

  let campaign_name = "Diwali lights",
    order_id = "30",
    order_created_at = "2021-10-30T20:33:11.911Z",
    expected_delivery_date = "2021-11-03T10:00:00.911Z",
    orderId = 0,
    campaign_current_order_count = 130,
    campaign_total_order_count = 100,
    order_status = 'accepted'

  //let {campaign_name, order_id, order_created_at, order_status, expected_delivery_date,
  // campaign_current_order_count, campaign_total_order_count} = order;
  //console.log(orderStatusMap);
  let orderStatusString = humanReadableStatus(order_status);

  return (
    <div
      style={{
        backgroundColor: "#F0F0F0",
        borderRadius: "4px",
        margin: "20px 30px",
        padding: "10px",
        height: "auto",
      }}
    >
      <div style={{ height: "20px" }}>
        <span style={{ fontSize: "18px", fontWeight: "bold", float: "left" }}>
          {campaign_name}
        </span>
        <span
          style={{
            fontSize: "12px",
            fontWeight: "bold",
            float: "right",
            color: "#3785B8",
          }}
        >
          {}
        </span>
      </div>
      <div style={{ height: "15px", marginTop: "10px" }}>
        <p
          style={{
            fontSize: "12px",
            color: "#3785B8",
            float: "left",
            width: "max-content",
            margin: "0",
          }}
        >
          Order ID:
        </p>
        <p
          style={{
            fontSize: "12px",
            color: "#4D4D4D",
            float: "right",
            width: "max-content",
            margin: "0",
          }}
        >
          {order_id}
        </p>
      </div>
      <div style={{ height: "15px", marginTop: "2px" }}>
        <p
          style={{
            fontSize: "12px",
            color: "#3785B8",
            float: "left",
            width: "max-content",
            margin: "0",
          }}
        >
          Order Date:
        </p>
        <p
          style={{
            fontSize: "12px",
            color: "#4D4D4D",
            float: "right",
            width: "max-content",
            margin: "0",
          }}
        >
          {getHumanReadableDate(order_created_at)}
        </p>
      </div>
      <div style={{ height: "15px", marginTop: "2px" }}>
        <p
          style={{
            fontSize: "12px",
            color: "#3785B8",
            float: "left",
            width: "max-content",
            margin: "0",
          }}
        >
          Delivery By:
        </p>
        <p
          style={{
            fontSize: "12px",
            color: "#4D4D4D",
            float: "right",
            width: "max-content",
            margin: "0",
          }}
        >
          {getHumanReadableDate(expected_delivery_date)}
        </p>
      </div>
      <div style={{ height: "15px", marginTop: "2px" }}>
        <p
          style={{
            fontSize: "12px",
            color: "#3785B8",
            float: "left",
            width: "max-content",
            margin: "0",
          }}
        >
          Delivery status:
        </p>
        <p
          style={{
            fontSize: "12px",
            color: "#4D4D4D",
            float: "right",
            width: "max-content",
            margin: "0",
          }}
        >
          {orderStatusString}
        </p>
      </div>
      <div
        style={{
          height: "8px",
          marginTop: "15px",
          width: "100%",
          backgroundColor: "#ffffff",
          padding: "1px",
          borderRadius: "5px",
        }}
      >
        <div
          style={{
            height: "8px",
            backgroundColor: "#48C28B",
            width: `${getFulfilledPecentage(
              campaign_current_order_count,
              campaign_total_order_count
            )}%`,
            borderRadius: "4px",
          }}
        ></div>
      </div>
      <div style={{ height: "12px", marginTop: "2px" }}>
        <p
          style={{
            fontSize: "10px",
            color: "#4D4D4D",
            fontWeight: "bold",
            float: "left",
            width: "max-content",
            margin: "0",
          }}
        >
          Campaign status
        </p>
        <p
          style={{
            fontSize: "10px",
            color: "#4D4D4D",
            fontWeight: "bold",
            float: "right",
            width: "max-content",
            margin: "0",
          }}
        >
          {campaign_current_order_count > campaign_total_order_count
            ? 0
            : campaign_total_order_count - campaign_current_order_count}{" "}
          left
        </p>
      </div>
    </div>
  );
};

const DummyOrder = () => {
  return (
    <SkeletonTheme baseColor="#E0E0E0" highlightColor="#FFFFFF">
      <div
        style={{
          backgroundColor: "#F0F0F0",
          borderRadius: "4px",
          margin: "20px 30px",
          padding: "10px",
          height: "auto",
        }}
      >
        <div style={{ height: "20px", width: "60%" }}>
          <h2 style={{ margin: "0" }}>
            <Skeleton />
          </h2>
        </div>
        <div style={{ height: "100px", marginTop: "10px" }}>
          <div style={{ display: "inline-block", width: "45%" }}>
            <Skeleton count={5} />
          </div>
          <div
            style={{ display: "inline-block", width: "50%", paddingLeft: "5%" }}
          >
            <Skeleton count={5} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

function OrderList(props) {
  const token = useSelector((state) => state && state.token);
  let { onBackClick } = props;
  const [orders, serOrders] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [orderType, setOrderType] = useState("active"); //active, past

  const getOrdersForTab = () => {
    let onGoingOrderTypes = ["Accepted", "Out For Delivery"];
    let previousOrderTypes = ["Delivered", "Cancelled"];
    let currentTabOrderTypes =
      orderType === "active" ? onGoingOrderTypes : previousOrderTypes;

    console.log(orders);
    let orderList = orders.filter((order) =>
      currentTabOrderTypes.includes(order.status)
    );
    let emptyListMessage = (
      <p
        style={{ textAlign: "center", paddingTop: "20px" }}
      >{`No ${orderType} orders to show.`}</p>
    );
    return orderList.length
      ? orderList.map((order) => {
        return <OrderCampaignCard order={order} />;
      })
      : emptyListMessage;
  };

  useEffect(() => {
    setIsFetching(true);
    getOrderList(token.accessToken, (err, res) => {
      console.log(res);
      setIsFetching(false);
      if (err) {
        showToast({
          type: "error",
          message: err,
        });
      } else {
        serOrders(res);
      }
    });
  }, token);

  return (
    <div className="order-list">
      <div className="tab-container">
        <div
          className={`tab ${orderType === "active" ? "active" : ""}`}
          onClick={() => {
            setOrderType("active");
          }}
        >
          Ongoing
        </div>
        <div
          className={`tab ${orderType === "past" ? "active" : ""}`}
          onClick={() => {
            setOrderType("past");
          }}
        >
          Previous
        </div>
      </div>
      <div className="order-container">
        {isFetching ? (
          <>
            <DummyOrder />
            <DummyOrder />
          </>
        ) : (
            getOrdersForTab()
          )}
      </div>
    </div>
  );
}

export default OrderList;
