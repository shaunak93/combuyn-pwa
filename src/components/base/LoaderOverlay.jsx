import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

function LoaderOverlay(props) {
  let { show } = props;
  return (
    <>
      {show && (
        <div className="loader-overlay">
          <CircularProgress
            variant="indeterminate"
            size={"5rem"}
            thickness={"4"}
            color={"primary"}
          />
        </div>
      )}
    </>
  );
}

export default LoaderOverlay;
