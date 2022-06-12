import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import CommonHeader from "../components/headers/CommonHeader";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ShareIcon from "@mui/icons-material/Share";

import CampaignDetails from "../components/CampaignDetails";
import CampaignCatalog from "../components/CampaignCatalog";
// import CampaignAddress from "../components/CampaignAddress";

import { getCampaign } from "../apis/campaign";

function Campaign(props) {
  const history = useHistory();
  const { match } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [campaignid, setCampaingId] = useState();
  const [campaign, setCampaign] = useState({});
  const [campaignMeta, setCampaignMeta] = useState({});
  const [products, setProducts] = useState();
  const [services, setServices] = useState();
  const [status, setStatus] = useState();
  const [order, setOrder] = useState();

  const [state, setState] = useState("details");

  //const
  //let {campaign, campaign_meta, status} = {};

  useEffect(() => {
    setIsLoading(true);
    let id = ((match || {}).params || {}).id;
    //let {name, start_datetime, end_datetime} = campaign || {};
    getCampaign({ id: id }, (err, res) => {
      if (err) {
        console.log("====================================");
        console.log("getCampaign", err);
        console.log("====================================");
        setIsLoading(false);
      } else {
        console.log("getCampaign", res);
        let {
          id,
          name,
          shortDescription,
          description,
          startTime,
          endTime,
          deliveryTime,
          ratings,
          minimumOrder,
          totalOrder,
          images,
          products,
          status,
        } = res;
        let newOrder = {};

        //let { campaign, campaign_meta, product_list, services, status } = res;

        // let newOrder = {
        //     "campaign": campaign.id,
        //     "quantity": campaign.min_order_count,
        //     "campaign_address": campaign.campaign_meta[0].address.id,
        //     "product_meta": [
        //         {
        //             "product_id": product && product[0].id,
        //             "quantity":  1
        //         }
        //     ]
        // }
        setCampaign({
          id,
          name,
          shortDescription,
          description,
          startTime,
          endTime,
          deliveryTime,
          minimumOrder,
          totalOrder,
          images,
          status,
          ratings,
        });
        //setProducts(products);
        setProducts(products || []);
        setStatus(status);
        setOrder(newOrder);
        setIsLoading(false);
      }
    });
  }, [match]);

  const getComponentByState = () => {
    console.log(state, campaign);
    switch (state) {
      case "details":
        return (
          <CampaignDetails
            campaign={campaign}
            onNextClick={() => setState("catalog")}
          />
        );
      case "catalog":
        return <CampaignCatalog campaign={campaign} products={products} />;
      //   case "address":
      //     return <CampaignDetails campaign={campaign} />;
      default:
        break;
    }
  };

  return (
    <div className="campaign-page">
      <CommonHeader
        onBackClick={() => {
          history.push("/home");
        }}
      />
      {getComponentByState()}
    </div>
  );
}

export default Campaign;

{
  /* import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
    <SkeletonTheme baseColor="#E0E0E0" highlightColor="#FFFFFF">
            <div style={{backgroundColor: '#F0F0F0', borderRadius: '4px', margin: '20px 30px', padding: '10px', height:'auto'}}>
                <div style={{height: '20px', width: '60%'}}>
                    <h2 style={{margin: '0'}}><Skeleton/></h2>
                </div>
                <div style={{height: '100px', marginTop: '10px'}}>
                    <div style={{display: 'inline-block', width: '45%'}}>
                        <Skeleton count={5}/>
                    </div>
                    <div style={{display: 'inline-block', width: '50%', paddingLeft: '5%'}}>
                        <Skeleton count={5}/>  
                    </div>
                </div>
            </div>
        </SkeletonTheme> */
}

{
  /*
  <div
        style={{
          height: "calc(100% - 48px)",
          width: "calc(100% - 20px)",
          backgroundColor: "white",
          margin: "10px 10px 0",
          borderRadius: "10px 10px 0 0",
        }}
      >
        <div style={{ padding: "18px 0 0 20px" }}>
          <span
            style={{ fontSize: "24px", color: "#4D4D4D", fontWeight: "bold" }}
          >
            Local Baker Campaign
          </span>
        </div>
        <div
          style={{
            width: "calc(100% + 20px)",
            height: "57px",
            backgroundColor: "#3785B8",
            margin: "10px 0 0 -10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontWeight: "bold",
              fontSize: "14px",
              color: "#fff",
              marginLeft: "19px",
            }}
          >
            Ends in 00h 00m 00s
          </span>
          <Button
            variant="outlined"
            startIcon={<ShareIcon />}
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: "14px",
              height: "35px",
              marginRight: "14px",
              backgroundColor: "#ffa64d",
              padding: "5px 10px",
              borderRadius: "10px",
            }}
          >
            Share
          </Button>
        </div>
      </div>

*/
}
