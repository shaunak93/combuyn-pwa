import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';



function AddressForm(props) {
    let {campaignDetails, editAddressDetails, addressDetails} = props;
    let addresses = (campaignDetails.campaign_meta || []).map((meta) => meta.address);
    const [selectedAddressId, setSelectedAddressId] = useState(addressDetails && addressDetails.selectAddresListId || '');

    const onAddressSelect = (idx) => {
        console.log(idx)
        let addressObj = campaignDetails.campaign_meta[idx-1].address;
        let address = {
            address_type: '2',
            selectAddresListId: idx,
            line1: '',
            line2: addressObj.line2,
            city: addressObj.city,
            state: addressObj.state,
            landmark: addressObj.landmark,
        }
        editAddressDetails(address)
    } 

    useEffect(() => {
        console.log(addressDetails);
        setSelectedAddressId(addressDetails && addressDetails.selectAddresListId || '')
    }, [addressDetails])

    const updateAddress = (str) => {
        let address = JSON.parse(JSON.stringify(addressDetails));
        address.line1 = str;
        editAddressDetails(address)
    }
    
    return (
        <div style={{position: 'relative', height: 'auto',  marginBottom: '15px',boxSizing:'border-box', borderRadius: '8px', backgroundColor:'#F7F7F7', padding: '10px 13px'}}>
            <span style={{fontSize: '16px', fontWeight: 'bold', color: '#4D4D4D'}}>Address</span>
            <span style={{paddingLeft: '10px', fontSize: '10px', fontWeight: 'bold', color: '#48C28B'}}>Free delivery</span>
            <FormControl   variant="standard" style={{width: 'calc(100% - 20px)',  marginTop: '10px'}}>
                <InputLabel id="select-socity">Select society</InputLabel>
                <Select
                value={selectedAddressId}
                label="Select socity"
                labelId="select-socity"
                style={{ fontSize: '14px'}}
                onChange={(e) => onAddressSelect(e.target.value)}
                required={true}
                >
                    {addresses && addresses.map((address, idx) => {
                        return <MenuItem value={idx+1}>
                            {address.address_name}
                        </MenuItem>
                    })}
                </Select>
                {!!selectedAddressId && <TextField 
                id="outlined-basic" 
                className="mt-10" 
                label="Flat no/ Room no" 
                variant="outlined" 
                size="small"
                style={{width: 'calc(100% - 20px)', marginTop: '10px',fontSize: '14px'}}
                value={addressDetails.line1}
                onChange={(event) => {updateAddress(event.target.value)}}
                required={true}
            />}
            </FormControl>
            

        </div>
    );
}

export default AddressForm;