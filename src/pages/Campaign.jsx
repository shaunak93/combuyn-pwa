import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import CommonHeader from "../components/headers/CommonHeader";
import CampaignDetails from "../components/CampaignDetails";
import CampaignCatalog from "../components/CampaignCatalog";

import { getCampaign } from "../apis/campaign";

function Campaign(props) {
  const history = useHistory();
  const { match } = props;
  const [campaign, setCampaign] = useState({});
  const [products, setProducts] = useState();

  const [state, setState] = useState("details");

  useEffect(() => {
    let id = ((match || {}).params || {}).id;
    getCampaign({ id: id }, (err, res) => {
      if (!err && res) {
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
        setProducts(products || []);
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
