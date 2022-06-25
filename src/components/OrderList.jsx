import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getOrderList } from "../apis/orders";
import { showToast } from "../utils/general";

import OrderCampaignCard from "./cards/OrderCampaignCard";

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
  }, [token.accessToken]);

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
