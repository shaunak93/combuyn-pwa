import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function CommonHeader(props) {
  const { onBackClick, title } = props;
  return (
    <div className="common-header">
      {onBackClick && (
        <div className="left-side" onClick={onBackClick}>
          <ArrowBackIosIcon className="back-icon" />
          <span className="back-label">Back</span>
        </div>
      )}
      {title && (
        <div className="right-side">
          <span className="title">{title || ""}</span>
        </div>
      )}
    </div>
  );
}

export default CommonHeader;
