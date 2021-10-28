import React from 'react';
import LoginComponent from '../LoginComponent';
import Modal from '@mui/material/Modal';
 

function LoginPopup(props) {
    let {callbackOnSuccess, onClose} = props; 
    return (
        <Modal
            style={{width: 'inherit'}}
            open={true}
            onClose={() => {onClose()}}
            aria-labelledby="modal-add-item-title"
            aria-describedby="modal-add-ite-description"
        >
            <LoginComponent callbackOnSuccess={callbackOnSuccess}/>
        </Modal>
    );
}

export default LoginPopup;