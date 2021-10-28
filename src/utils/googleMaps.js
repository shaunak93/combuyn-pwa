/* eslint-disable no-undef */
import Geocode from "react-geocode";
Geocode.setLanguage("en");
Geocode.setRegion("in");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();

const _apiKey = {
 _key: ''
}


const setGoogleMapsApiKey = (apiKey) => {
    Geocode.setApiKey(apiKey);
    _apiKey._key = apiKey;
}

const getAddressByLatLong = (lat, long, callback) => {
    if(!lat || !long){
        callback('lat_long_missing');
    }
    Geocode.fromLatLng(lat, long).then(
        (response) => {
            console.log(response);
            let result = response.results && response.results[0];
            let main_text = result.address_components &&  result.address_components[0].long_name;
            let secondary_text = result.address_components.reduce((prev, curr, index)=>{
                return (index === 0)?prev : (prev +' '+curr.long_name);
            } , '')
            callback(null, {main_text, secondary_text} );
        },
        (error) => {
            console.error(error);
            callback('error');
        }
    );
}

const getAddressSuggestions = (searchStr, callback) => {
    const googlePlaceService = new google.maps.places.AutocompleteService();
    googlePlaceService.getQueryPredictions({ input: searchStr }, (predictions) => {
        callback(predictions)
    });
}

const getLatLongByPlaceID = (placeId, callback) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ placeId: placeId })
    .then(({ results }) => {
        let result = results && results[0];
            let lat = result.geometry.location.lat()
            let long = result.geometry.location.lng()
            callback({lat, long} );
    })
    .catch((e) => console.log("Geocoder failed due to: " + e));
}


export {setGoogleMapsApiKey, getAddressByLatLong, getAddressSuggestions,getLatLongByPlaceID}