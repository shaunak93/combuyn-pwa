import React from 'react';
import Drawer from '@mui/material/Drawer';

function BasicDrawer(props) {
    const {anchor, open, onClose, children} = props;
    return (
      <>
        <Drawer
            anchor={anchor}
            open={open}
            onClose={()=>{
              onClose && onClose();
            }}
        >
            {children}
        </Drawer>
      </>
    );
}

export default BasicDrawer;