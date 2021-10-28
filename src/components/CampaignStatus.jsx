import React from "react";
import { CAMPAIGN_STATUS } from "../constants/campaign";
function CampaignStatus(props) {
  let { status } = props;
  let campaignStatus = CAMPAIGN_STATUS[status] || {};
  return (
    <div id="campaign_status" className={`campaign-status ${status.value}`}>
      {status.label}
    </div>
  );
}

export default CampaignStatus;
