import React from "react";

import ShareIcon from "@mui/icons-material/Share";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const getCampaignStatus = (
  is_active,
  start_datetime,
  end_datetime,
  currentTime
) => {
  if (is_active) return "active";
  if (start_datetime) {
    if (new Date(start_datetime).getTime() > currentTime) return "upcoming";
  }
  if (end_datetime) {
    if (new Date(end_datetime).getTime() < currentTime) return "finished";
  }
  return "finished";
};

const getCountdownTimeString = (end_datetime, currentTime) => {
  if (!end_datetime || !currentTime) return "00 Days 00 Hours 00 Minutes";

  let end_datetime_time = new Date(end_datetime).getTime();
  let timeleft = (end_datetime_time - currentTime) / (1000 * 60); //converting into total minutes left
  let totalMinutesLeft = Math.floor(timeleft % 60);
  let totalHoursLeft = Math.floor((timeleft / 60) % 24);
  let totalDaysLeft = Math.floor(timeleft / (60 * 24));

  let convertToDoubleDigit = (num) => {
    return num.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  };

  return `${convertToDoubleDigit(totalDaysLeft)} Days ${convertToDoubleDigit(
    totalHoursLeft
  )} Hours ${convertToDoubleDigit(totalMinutesLeft)} Minutes`;
};

const getFulfilledPecentage = (a, b) => {
  return Math.floor((a * 100) / b);
};

function ProductCampaignCard(props) {
  let currentTime = new Date().getTime();
  let { campaignDetails, onClick, isFullWidth } = props;
  let {
    name,
    link,
    is_active,
    start_datetime,
    end_datetime,
    image,
    smallDescription,
    original_price,
    selling_price,
    total_order_count,
    current_order_count,
  } = campaignDetails;
  let status = getCampaignStatus(
    is_active,
    start_datetime,
    end_datetime,
    currentTime
  );

  const shareCampaign = (e) => {
    e.preventDefault();
    e.stopPropagation();
    fetch(
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
    )
      .then(function (response) {
        return response.blob();
      })
      .then(function (blob) {
        var file = new File([blob], "picture.jpg", { type: "image/jpeg" });
        var filesArray = [file];

        if (navigator.canShare && navigator.canShare({ files: filesArray })) {
          navigator.share({
            text: "some_text",
            files: filesArray,
            title: "some_title",
            url: "some_url",
          });
        }
      });
  };
  return (
    <div
      className="product-campaign-card"
      onClick={() => {
        onClick(campaignDetails.id);
      }}
      style={{
        position: "relative",
        width: `${isFullWidth ? "100%" : "232px"}`,
        height: "226",
        borderRadius: "4px",
        backgroundColor: "#E6E6E6",
        marginRight: "15px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "inherit",
          position: "relative",
          height: "136px",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        <img
          style={{ width: "inherit", height: "inherit", borderRadius: "4px" }}
          src={image}
          alt="Loading..."
        />
        {/*<div style={{position: 'absolute', left: '6px', bottom: '0px', width: '28px', height:"38px"}}>
                    <IconButton style={{width: '28px', height:"28px", backgroundColor:'#F7F7F7'}} disabled={false} aria-label="bookmark" onClick={(e)=>{console.log(e)}} >
                        <FavoriteRoundedIcon style={{color: '#FD4C4C', fontSize: '16px'}}/>
                    </IconButton>
                    <p style={{width: '28px', height: '10', textAlign: 'center', color:'#F7F7F7', fontSize: '8px', fontWeight:'bold', margin: '0'}}>Save</p>
                /div>*/}
        <div
          style={{
            position: "absolute",
            right: "6px",
            bottom: "10px",
            width: "75px",
            height: "30px",
          }}
        >
          <Button
            onClick={shareCampaign}
            style={{
              height: "inherit",
              width: "inherit",
              border: "2px solid #ffffff",
              borderRadius: "15px",
              fontSize: "12px",
              fontWeight: "bold",
              textTransform: "capitalize",
              backgroundColor: "#FFA64D",
              color: "#ffffff",
            }}
            variant="text"
            startIcon={<ShareIcon style={{ fontSize: "15px" }} />}
          >
            Share
          </Button>
        </div>
      </div>
      <div
        style={{
          width: "inherit",
          height: "60px",
          borderRadius: "4px",
          backgroundColor: "#E6E6E6",
        }}
      >
        <Grid container spacing={0}>
          <Grid item xs={8} style={{ padding: "10px 12px 0" }}>
            <p style={{ margin: "0", fontSize: "15px", fontWeight: "bold" }}>
              {name}
            </p>
            <p style={{ margin: "0", fontSize: "12px" }}>
              {smallDescription || ""}
            </p>
          </Grid>
          <Grid item xs={4} style={{ padding: "10px 12px 0" }}>
            <p
              style={{
                margin: "0",
                fontSize: "15px",
                fontWeight: "bold",
                textAlign: "right",
              }}
            >
              {" "}
              &#8377;{selling_price || "-"}
            </p>
            <p style={{ margin: "0", fontSize: "10px", textAlign: "right" }}>
              MRP:
              {original_price ? (
                <span style={{ textDecoration: "line-through", color: "red" }}>
                  <span style={{ color: "#000" }}>{original_price || "-"}</span>
                </span>
              ) : (
                "-"
              )}
            </p>
          </Grid>
          {status === "upcoming" && (
            <Grid item xs={12} style={{ padding: "4px 12px 0" }}>
              <p style={{ margin: "0", fontSize: "10px", textAlign: "center" }}>
                <span style={{ width: "max-content", margin: "0" }}>
                  Minimum Order Quantity
                </span>
                <span
                  style={{
                    width: "max-content",
                    color: "#3785B8",
                    fontWeight: "bold",
                    margin: "0",
                  }}
                >
                  &nbsp; {total_order_count} Pcs
                </span>
              </p>
            </Grid>
          )}
        </Grid>
      </div>
      {status === "active" && (
        <>
          <div
            style={{
              position: "absolute",
              left: "7px",
              top: "187px",
              width: "214px",
              height: "10px",
              borderRadius: "7px",
              backgroundColor: "#ffffff",
              padding: "2px",
            }}
          >
            <div
              style={{
                borderRadius: "5px",
                width: `${getFulfilledPecentage(
                  current_order_count,
                  total_order_count
                )}%`,
                height: "10px",
                backgroundColor: "#48C28B",
                minWidth: "min-content",
              }}
            >
              <p
                style={{
                  color: "#ffffff",
                  fontSize: "8px",
                  width: "fit-content",
                  margin: "0",
                  padding: "0 4px",
                  fontWeight: "bold",
                }}
              >{`${getFulfilledPecentage(
                current_order_count,
                total_order_count
              )}%`}</p>
            </div>
          </div>
          <div
            style={{ width: "inherit", height: "30px", borderRadius: "4px" }}
          >
            <span
              style={{
                width: "100%",
                textAlign: "center",
                display: "block",
                paddingTop: "8px",
              }}
            >
              <span
                style={{ fontSize: "12px", margin: "0", fontWeight: "bold" }}
              >
                Ends in:{" "}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  margin: "0",
                  color: "#3785B8",
                  fontWeight: "500",
                }}
              >
                {getCountdownTimeString(end_datetime, currentTime)}
              </span>
            </span>
          </div>
        </>
      )}

      {status === "upcoming" && (
        <div style={{ width: "inherit", height: "30px", borderRadius: "4px" }}>
          <span
            style={{
              width: "100%",
              textAlign: "center",
              display: "block",
              paddingTop: "8px",
            }}
          >
            <span style={{ fontSize: "12px", margin: "0", fontWeight: "bold" }}>
              Starts in:{" "}
            </span>
            <span
              style={{
                fontSize: "12px",
                margin: "0",
                color: "#3785B8",
                fontWeight: "500",
              }}
            >
              {getCountdownTimeString(currentTime, start_datetime)}
            </span>
          </span>
        </div>
      )}

      {status === "finished" && (
        <div
          style={{
            width: "inherit",
            height: "30px",
            backgroundColor: "#E6E6E6",
            textAlign: "center",
          }}
        >
          <Button
            style={{
              height: "22px",
              width: "205px",
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: "bold",
              textTransform: "capitalize",
              backgroundColor: "#F7F7F7",
              color: "#3785B8",
            }}
            variant="text"
          >
            Start Again
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProductCampaignCard;
