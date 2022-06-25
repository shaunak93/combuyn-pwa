import React, { useState } from "react";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useHistory } from "react-router-dom";
import { useTimeLeft } from "../../hooks/hooks";

const pallete = [
  {
    background: "#1F1D36",
    font: "#E9A6A6",
  },
  {
    background: "#1C0C5B",
    font: "#C996CC",
  },
  {
    background: "#2D2424",
    font: "#E0C097",
  },
  {
    background: "#382933",
    font: "#A4B494",
  },
];

function CampaignCard({ campaign, isClickable, index }) {
  let { id, startTime, endTime, shortDescription, images } = campaign;
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  let image = (images && images.length && images[0]?.link) || "";
  const colorPallete = pallete[index % 4];
  const history = useHistory();

  const onClick = () => {
    console.log("isClickable", isClickable);
    if (isClickable) {
      console.log("clicked", campaign.id, id);
      history.push(`/campaign/${id}`);
    }
  };
  const { timeLeftToEndString } = useTimeLeft({
    startTime,
    endTime,
  });

  return (
    <div onClick={onClick} style={{ paddingTop: "20px" }}>
      <div style={{ height: "30px" }}>
        <div
          style={{
            height: "25px",
            float: "right",
            backgroundColor: colorPallete.background,
            padding: "5px 10px 0",
          }}
        >
          <span
            style={{
              color: colorPallete.font,
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            <TimerOutlinedIcon style={{ color: "#fff", fontSize: "16px" }} />
            {timeLeftToEndString}
          </span>
        </div>
      </div>
      <div style={{ width: "inherit" }}>
        {!isImageLoaded && (
          <SkeletonTheme baseColor="#E0E0E0" highlightColor="#FFFFFF">
            <div
              style={{
                backgroundColor: "#F0F0F0",
                borderRadius: "4px",
                height: "auto",
                padding: "0",
              }}
            >
              <Skeleton height={250} />
            </div>
          </SkeletonTheme>
        )}
        <img
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            opacity: isImageLoaded ? "1" : "0",
          }}
          src={image}
          onLoad={() => {
            setIsImageLoaded(true);
          }}
          alt="loading..."
        ></img>
      </div>
      <div
        style={{
          height: "fit-content",
          position: "relative",
          backgroundColor: colorPallete.background,
          color: colorPallete.font,
          fontWeight: "bold",
          fontSize: "14px",
        }}
      >
        <span
          style={{
            width: "calc(100% - 50px)",
            padding: "15px 10px",
            display: "inline-block",
          }}
        >
          {shortDescription}
        </span>
        <div
          style={{
            width: "20px",
            height: "20px",
            position: "absolute",
            borderRadius: "15px",
            border: "2px solid #fff",
            top: "calc(50% - 10px)",
            right: "10px",
          }}
        >
          <ArrowForwardIcon style={{ color: "#fff", fontSize: "20px" }} />
        </div>
      </div>
    </div>
  );
}

export default CampaignCard;
