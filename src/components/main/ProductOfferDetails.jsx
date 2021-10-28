import React from "react";
import Section from "../base/Section";

function ProductOfferDetails(props) {
  return (
    <Section id="product-offer-details-section">
      <div className="product-name">Apples Kashmiri</div>
      <div className="product-price">
        <p>Price - </p>
        <p>
          <strike>120/Kg</strike>
        </p>
        <p>
          <b>90/kg</b>
        </p>
      </div>
      <div className="product-delivery-fee">
        <p>Delivery fee - </p>
        <p>10/Kg</p>
      </div>
    </Section>
  );
}

export default ProductOfferDetails;
