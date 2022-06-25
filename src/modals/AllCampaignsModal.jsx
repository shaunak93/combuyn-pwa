import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ProductCampaignCard from "../components/cards/ProductCampaignCard";
import BasicModal from "../components/base/BasicModal";

function AllCampaignsModal(props) {
  const { show, headerLabel, campaignList, onCardClick, onClose } = props;
  return (
    <BasicModal open={show}>
      <div
        style={{
          position: "relative",
          height: "56px",
          width: "100%",
          padding: "8px 30px",
          boxSizing: "border-box",
        }}
      >
        <ArrowBackIosNewIcon
          style={{
            color: "#3785B8",
            fontSize: "30px",
            paddingTop: "5px",
            zIndex: "999",
          }}
          onClick={onClose}
        />
        <p
          style={{
            width: "calc(100% - 40px)",
            margin: "0",
            textAlign: "center",
            display: "inline-block",
          }}
        >
          <p
            style={{
              margin: "0",
              fontSize: "20px",
              fontWeight: "bold",
              color: "#4D4D4D",
            }}
          >
            {headerLabel}
          </p>
          <p style={{ margin: "0", fontSize: "10px", color: "#4D4D4D" }}>
            Tap on the banner to enter campaign
          </p>
        </p>
      </div>
      <div
        style={{
          height: "calc(100% - 56px)",
          width: "100%",
          padding: "0 30px",
          boxSizing: "border-box",
          overflowY: "scroll",
        }}
      >
        {campaignList.map((campaign) => (
          <div style={{ paddingBottom: "15px" }}>
            <ProductCampaignCard
              {...campaign}
              isFullWidth={true}
              onClick={onCardClick}
            />
          </div>
        ))}
      </div>
    </BasicModal>
  );
}

export default AllCampaignsModal;
