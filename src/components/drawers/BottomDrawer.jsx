import React from "react";
import Drawer from "@mui/material/Drawer";

function BottomDrawer(props) {
  const { children, open, onClose = () => {}, key, className } = props;
  return (
    <React.Fragment key={key}>
      <Drawer
        anchor="bottom"
        open={open}
        onClose={onClose}
        className={className}
      >
        {children}
      </Drawer>
    </React.Fragment>
  );
}

export default BottomDrawer;
