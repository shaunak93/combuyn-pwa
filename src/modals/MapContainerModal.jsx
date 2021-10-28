import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import GoogleMapReact from 'google-map-react'; 
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BasicModal from '../components/base/BasicModal';


const mapStyles = {
  width: '100%',
  height: '100%'
};

const MapContainerModal = (props) => {
    const {isOpen, apiKey, currentCoordinates, onLocationUpdate} = props;
    const [lat, setLat] = useState(currentCoordinates.lat);
    const [long, setLong] = useState(currentCoordinates.long);


    const onClickContinue = () => {
        onLocationUpdate({lat, long})
    }
    
    
    return (
        <BasicModal 
                open={isOpen}
            >
                <GoogleMapReact
                    bootstrapURLKeys={{ key: apiKey}}
                    fullscreenControl={false}
                    zoomControl={false}
                    defaultCenter={{
                        lat: lat,
                        lng: long
                    }}
                    defaultZoom={16}
                    onDragEnd={(map) => {
                        setLat(map.center.lat())
                        setLong(map.center.lng())
                    }}
                    options={{
                        fullscreenControl:false,
                        zoomControl:false
                    }}
                >
                </GoogleMapReact>
                <LocationOnIcon style={{position: 'absolute', fontSize: '30px',top: 'calc(50% - 30px)', left: 'calc(50% - 15px)'}}/>
                <div style={{position: 'absolute', bottom: '10px', left: '20px', boxSizing: 'border-box',
                            width: 'calc(100% - 40px)', height: '50px',borderRadius: '10px',
                            backgroundColor:'#FFA64D', color: '#ffffff', textAlign: 'center',
                            fintSize: '20px', fontWeight: 'bold', paddingTop: '14px'}}
                    onClick={onClickContinue}
                >
                    Confirm Location
                </div>
        </BasicModal>
    )
}
export default  MapContainerModal;