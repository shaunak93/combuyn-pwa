import React from "react";
import parse from "html-react-parser";
import { useTimeLeft } from "../hooks/hooks";
import Button from "@mui/material/Button";
import ShareIcon from "@mui/icons-material/Share";
import ImageSlider from "./ImageSlider";
import Rating from "@mui/material/Rating";

function CampaignDetails({ campaign, onNextClick }) {
  let {
    name,
    description,
    startTime,
    endTime,
    minimumOrder,
    totalOrder = 20,
    images,
    status,
    ratings,
  } = campaign;

  let imageList = (images || []).map((img) => img.link);
  let minimumOrderRemaining =
    minimumOrder && totalOrder && minimumOrder - totalOrder;
  // let { name, start_datetime, end_datetime, description } = campaign;

  // let { catalogue_images, execution_at, order_count } = campaign_meta;

  let showCampaignOrderDetails = minimumOrder || totalOrder;

  const { timeLeftToStartString, timeLeftToEndString } = useTimeLeft({
    startTime,
    endTime,
  });
  return (
    <div className="campaign-details">
      <div className="header">
        <span className="label">{name}</span>
      </div>
      <div className="ribbon-panel">
        {!!timeLeftToStartString && (
          <span className="time-left-label">
            Starts in {timeLeftToStartString}
          </span>
        )}
        {!!timeLeftToEndString && (
          <span className="time-left-label">Ends in {timeLeftToEndString}</span>
        )}
        <Button
          variant="outlined"
          startIcon={<ShareIcon />}
          className="share-button"
        >
          Share
        </Button>
      </div>
      <div className="campaign-images">
        <ImageSlider
          margin={"10px auto"}
          imageUrls={imageList}
          showIndicators={true}
        />
      </div>
      {!!showCampaignOrderDetails && (
        <div className="campaign-order-details">
          {!!minimumOrder && (
            <p>
              {" "}
              Minimum Group Quantity :&nbsp;<span>{minimumOrder}</span>
            </p>
          )}
          {!!totalOrder && (
            <p>
              {" "}
              Already Bought :&nbsp;<span>{totalOrder}</span>
            </p>
          )}
          {!!minimumOrderRemaining && minimumOrderRemaining > 0 && (
            <p>
              {" "}
              Quantity remaining :&nbsp;<span>{minimumOrderRemaining}</span>
            </p>
          )}
        </div>
      )}

      <div className="scrolling-div">
        {!!description && (
          <div className="campaign-description">
            <p className="header">Description</p>
            <div className="parsed-html">{parse(description)}</div>
            <div style={{ height: "60px" }}></div>
          </div>
        )}
      </div>
      <div className="footer-div">
        {!!ratings ||
          (ratings === 0 && (
            <div className="rating">
              <p>Rating</p>
              <Rating name="read-only" value={3.5} readOnly />
            </div>
          ))}
        <div className="floating-button" onClick={onNextClick}>
          <p>{status === "Active" ? "Shop Now" : "Check Products"}</p>
        </div>
      </div>
    </div>
  );
}

export default CampaignDetails;
