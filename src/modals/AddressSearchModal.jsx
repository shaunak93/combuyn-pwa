import React, {useEffect, useState} from 'react';
import AddressSearchModalHeader from '../components/headers/AddressSearchModalHeader';
import BasicModal from '../components/base/BasicModal';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import PinDropIcon from '@mui/icons-material/PinDrop';
import { getAddressSuggestions, getLatLongByPlaceID } from '../utils/googleMaps';


function AddressSearchModal(props) {
    const {isOpen, userAddresses, openMap, onLocationUpdate, apiKey} = props;
    const [searchStr, setSearchStr] = useState('');
    const [searchedAddresses, setSearchedAddresses] = useState([])

    useEffect(()=>{
        if(searchStr.trim()){
            getAddressSuggestions(searchStr, (res)=>{
                setSearchedAddresses(res)
            })
        }
    }, [searchStr])

    const updateCurrentLocation = ({place_id, main_text, secondary_text}) => {
        onLocationUpdate({place_id, main_text, secondary_text})
    }
    
    const getAddressCards = ({addresses, areSavedAddresses}) => {
        return addresses.map(
            (address) => <div onClick={(e) => {e.preventDefault();updateCurrentLocation({place_id: address.place_id, ...address.structured_formatting})}}  style={{position: 'relative', height: '56px', width: '100%', padding: '8px 10px', boxSizing:'border-box', borderBottom: '2px solid rgb(247, 247, 247)'}}>
                <div style={{position:'relative', width: '50px', height: '100%', float: 'left', "color":"#4d4d4d"}}>
                    <PinDropIcon style={{position:'relative', fontSize: '20px', paddingTop: '5px'}}/>
                </div>
                <div style={{width: 'calc(100% - 50px)', height: '100%', float: 'right'}} >
                    <p style={{"fontSize":"13px","padding":"0","boxSizing":"border-box","color":"#4d4d4d","fontWeight":"bold", margin: '0', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                        {address.structured_formatting.main_text}
                    </p>
                    <p style={{"fontSize":"10px","paddingTop":"3px","boxSizing":"border-box","color":"#4d4d4d", margin: '0', textOverflow: 'ellipsis',  overflow: 'hidden', whiteSpace: 'nowrap'}}>
                        {address.structured_formatting.secondary_text || address.structured_formatting.main_text}
                    </p>
                </div>
            </div>
        )
    }

    return (
        <BasicModal 
            open={isOpen}
        >
            <AddressSearchModalHeader setSearchStr={setSearchStr}/>
            
            <div onClick={openMap} style={{position: 'relative', height: '56px', width: '100%', padding: '8px 10px', boxSizing:'border-box', borderBottom: '5px solid rgb(247, 247, 247)'}}>
                <div style={{position:'relative', width: '50px', height: '100%', float: 'left', "color":"rgb(55, 133, 184)"}}>
                    <GpsFixedIcon style={{position:'relative', fontSize: '20px', paddingTop: '5px'}}/>
                </div>
                <div style={{width: 'calc(100% - 50px)', height: '100%', float: 'right'}} >
                    <div style={{"fontSize":"15px","padding":"8px 0 0","boxSizing":"border-box","color":"rgb(55, 133, 184)","fontWeight":"bold"}}>
                        Current Location
                    </div>
                </div>
            </div>
            {(searchedAddresses.length > 0) && getAddressCards({addresses: searchedAddresses, areSavedAddresses:false})}
        </BasicModal>
    );
}

export default AddressSearchModal;