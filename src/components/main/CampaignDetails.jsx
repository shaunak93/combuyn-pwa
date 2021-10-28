import React from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import Section from '../base/Section';

function CampaignDetails(props) {
  return (
    <Section id="campaign_details_section">
      <div>Campaign details</div>
      <div>Minimum Oder:</div>
      <div>
        <LinearProgress 
          style={{
            height: 20,
            borderRadius: 10
          }}
          variant="determinate" value={80} thickness={25}/>
      </div>
      <div>Start : 00 00 00 | 00/00/00</div>
      <div>End : 00 00 00 | 00/00/00</div>
    </Section>
  );
}

export default CampaignDetails;
