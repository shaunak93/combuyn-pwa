import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

function ImageSlider(props) {
  const {
    imageUrls,
    margin,
    showIndicators,
    imageKeyLabel = "imageKeyLabel",
  } = props;
  return (
    <div
      style={{
        width: "inherit",
        height: "auto",
        textAlign: "center",
        margin: margin || "0",
        boxSizing: "border-box",
      }}
    >
      {imageUrls && (
        <Slide
          autoplay={true}
          transitionDuration={500}
          duration={2000}
          arrows={false}
          indicators={
            showIndicators && ((i) => <div className="image_indicator"></div>)
          }
        >
          {imageUrls.map((imageUrl, i) => {
            return (
              <div
                className="each-slide"
                style={{ width: "100%", height: "100%", textAlign: "center" }}
                key={`imageKeyLabel_${i}`}
              >
                <img
                  style={{
                    maxWidth: "calc(100% - 10px)",
                    maxHeight: "250px",
                    borderRadius: "10px",
                  }}
                  src={imageUrl}
                  alt={"Loading..."}
                />
              </div>
            );
          })}
        </Slide>
      )}
    </div>
  );
}

export default ImageSlider;
