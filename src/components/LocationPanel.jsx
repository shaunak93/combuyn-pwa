import React, {useState, useEffect} from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@material-ui/core/Grid'
import MapContainerModal from '../modals/MapContainerModal';
import { setGoogleMapsApiKey, getAddressByLatLong, getLatLongByPlaceID } from '../utils/googleMaps';
import AddressSearchModal from '../modals/AddressSearchModal';

function LocationPanel(props) {
    const {style, currentCoordinates, setCurrentCoordinates} = props;

    const [isMapOpen, setIsMapOpen] = useState(false);
    const [isAddressSearchOpen, setIsAddressSearchOpen] = useState(false);
    const [currentAddress, setCurrentAddress] = useState(null);

    const handleLocationUpdateLatLong = ({lat, long}) => {
        setCurrentCoordinates({lat, long});
        getAddressByLatLong(lat, long, (err, res) => {
            if(res){
                setCurrentAddress(res);
            }
        })
        setIsMapOpen(false);
    }

    const handleLocationUpdatePlaceId= ({place_id, main_text, secondary_text}) => {
        getLatLongByPlaceID(place_id, (res)=>{
            setCurrentCoordinates(res)
        })
        setCurrentAddress({main_text, secondary_text})
        setIsAddressSearchOpen(false);
    }

    const openMap = () => {
        setIsAddressSearchOpen(false)
        setIsMapOpen(true);
    }

    const openAddressSearch= () => {
        setIsMapOpen(false);
        setIsAddressSearchOpen(true)
    }

    useState(()=>{
        setGoogleMapsApiKey('AIzaSyC_etEdOc1bGYD4JoUau1fM4-iT_XLBFg4')
    })

    useState(()=>{
        if(!currentCoordinates){
            navigator.geolocation.getCurrentPosition(function(position) {
                let latLong = {
                    lat: position.coords.latitude,
                    long: position.coords.longitude
                }
                setCurrentAddress(latLong);
                getAddressByLatLong(latLong.lat, latLong.long, (err, res) => {
                    if(res){
                        setCurrentAddress(res);
                    }
                })
              });
        }
    }, [currentCoordinates])
    //<Grid item xs={12} className="font-8">
    //Viewing from location
    //</Grid>

    return (
        <>
            <Grid container spacing={1} className="user-location-div" style={style} onClick={()=>{openAddressSearch()}}>
                <Grid item xs={11}>
                    <Grid item xs={12} className="current-address">
                    {currentAddress
                        ?<>
                            <p style={{margin: '0', fontSize: '12px', fontWeight: 'bold', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}> {currentAddress.main_text} </p>
                            <p style={{margin: '0', fontSize: '10px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}> {currentAddress.secondary_text} </p>
                        </>
                        :<p style={{paddingTop: '5px', color: '#4d4d4d',margin: '0', fontSize: '12px', fontWeight: 'bold'}}>Fetching address...</p>
                    } 
                    </Grid>
                </Grid>
                <Grid item xs={1} className="">
                    <LocationOnIcon className="icon"/>
                </Grid>
            </Grid>
            {currentCoordinates && <MapContainerModal 
                isOpen={isMapOpen}
                apiKey={'AIzaSyC_etEdOc1bGYD4JoUau1fM4-iT_XLBFg4'} 
                currentCoordinates={currentCoordinates}
                onLocationUpdate={handleLocationUpdateLatLong}
            />}
            <AddressSearchModal 
                apiKey={'AIzaSyC_etEdOc1bGYD4JoUau1fM4-iT_XLBFg4'} 
                isOpen={isAddressSearchOpen}
                userAddresses={[]} 
                openMap={openMap}
                onLocationUpdate={handleLocationUpdatePlaceId}
            />
        </>
    );
}



export default LocationPanel;