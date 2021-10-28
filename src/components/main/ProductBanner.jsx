import React from "react";
import Section from "../base/Section";
import CampaignStatus from "../CampaignStatus";
import { CAMPAIGN_STATUS } from "../../constants/campaign";

function ProductBanner(props) {
  let { product, campaignStatus } = props;
  let imageUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-s6zwon2svzljnlYRjk-piyG6L6zHXP09eA&usqp=CAU";
  return (
    <Section id="product_banner_section">
      <div
        className="product-banner"
        style={{ backgroundImage: `url("${imageUrl}")` }}
      >
        <CampaignStatus status={CAMPAIGN_STATUS.UPCOMING} />
      </div>
    </Section>
  );
}

export default ProductBanner;
