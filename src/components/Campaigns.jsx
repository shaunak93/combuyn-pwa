import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import CampaignCard from "./cards/CampaignCard";
import DummyCampaignCard from "./skeletons/DummyCampaignCard";
import { getCampaigns } from "../apis/campaign";
import "react-loading-skeleton/dist/skeleton.css";

const tabList = [
  { value: "active", text: "Active" },
  { value: "upcoming", text: "Upcoming" },
  { value: "Completed", text: "Completed" },
];

function Campaigns() {
  const [isLoading, setIsLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedTab, setSelectedTab] = useState(tabList && tabList[0].value);
  const [loadError, setLoadError] = useState("");
  const apartmentId = useSelector(
    (state) => state.address && state.address.apartmentId
  );

  useEffect(() => {
    if (!apartmentId) return;
    getCampaigns({}, (err, res) => {
      setIsLoading(false);
      if (err) {
        setLoadError(err);
      } else {
        console.log(res);
        setCampaigns(
          (res || []).filter(
            (campaign) => true
            //(campaign?.apartments || []).includes(apartmentId)
          )
        );
      }
    });
  }, [apartmentId]);

  const getCampaignCards = () => {
    console.log(isLoading, campaigns);

    if (isLoading) {
      return <DummyCampaignCard />;
    } else if (loadError) {
      //return loadError;
      return <DummyCampaignCard />;
    } else {
      let campaignList = campaigns.filter(
        ({ status }) => status.toLowerCase() === selectedTab.toLowerCase()
      );
      if (campaignList && campaignList.length) {
        return campaignList.map((campaign, i) => {
          return (
            <CampaignCard
              campaign={campaign}
              isClickable={true}
              index={i}
              key={campaign.id}
            />
          );
        });
      } else {
        return <p>Unable to find campaign</p>;
      }
      //   return campaigns
      //     .filter((campaign) => campaign.status === selectedTab)
      //     .map((campaign, i) => (
      //         <CampaignCard campaign={campaign} isClickable={true} index={i} />
      //     ))
    }
  };

  return (
    <Grid
      container
      spacing={1}
      className="campaigns"
      style={{ height: "calc(100% - 200px)" }}
    >
      <Grid
        item
        xs={12}
        className="header"
        style={{ marginLeft: "30px", height: "60px" }}
      >
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <p
              className="font-22 font-bold margin-0 width-max-content"
              style={{ color: "#3785B8" }}
            >
              {"Campaigns"}
            </p>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        style={{ margin: "0 30px", height: "calc(100% - 60px)" }}
      >
        <div
          style={{
            height: "30px",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignContent: "center",
            justifyContent: "space-around",
            alignItems: "center",
            paddingBottom: "15px",
          }}
        >
          {tabList.map((tab) => {
            //#3785B8
            let isSelected = tab.value === selectedTab;
            return (
              <div
                style={{
                  display: "inline-block",
                  height: "30px",
                  color: "#3785B8",
                  opacity: isSelected ? "1.0" : "0.4",
                  borderBottom: isSelected ? "2px solid #3785B8" : 0,
                  lineHeight: "40px",
                  fontWeight: "700",
                  fontSize: "14px",
                  padding: "0 5px",
                }}
                onClick={() => setSelectedTab(tab.value)}
              >
                {tab.text}
              </div>
            );
          })}
        </div>

        <div
          style={{
            minWidth: "30px",
            height: "calc(100% - 45px)",
            overflowY: "scroll",
          }}
        >
          {getCampaignCards()}
        </div>
        {/*campaignList.map((campaign)=> <ProductCampaignCard campaignDetails={campaign} isFullWidth={false} onClick={onCardClick}/>)*/}
      </Grid>
    </Grid>
  );
}

// campaignList
//             .filter((campaign) => campaign.status === selectedTab)
//             .map((campaign, i) => (
//               <CampaignCard campaign={campaign} isClickable={true} index={i} />
//             ))

export default Campaigns;
