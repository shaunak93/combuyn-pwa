import React from 'react';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

function BasicModal(props) {
    const {
        open, modalClass, leftButtons, headerLabel, rightButtons, children
    } = props;
    
    return (
        <Modal
            open={open}
            onClose={()=>{}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className={modalClass || ''}
        >
            <Fade in={open}>
                <div className='basic-modal'>
                {children || ''}
                    {/*<div className="basic-modal-header">
                        <div className="left-buttons">
                            {leftButtons || ''}
                        </div>
                        <div className="label">
                            {headerLabel || ''}
                        </div>
                        <div className="right-buttons">
                            {rightButtons || ''}
                        </div>
                    </div>
                    <div className="basic-modal-body">
                        {children || ''}
                    </div>*/}
                </div>
            </Fade>
        </Modal>
        
    );
}

export default BasicModal;
