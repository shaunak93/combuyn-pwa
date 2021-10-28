import React, { useState,  useEffect } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {DebounceInput} from 'react-debounce-input';
import { getAddressSuggestions } from '../../utils/googleMaps';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

function AddressSearchModalHeader(props) {

    const {setSearchStr} = props;
    return (
        <div style={{position: 'relative', height: '56px', width: '100%', padding: '8px 10px', boxSizing:'border-box', borderBottom: '1px solid rgb(247, 247, 247)'}}>
            <div style={{color: '#3785B8', height: '40px'}}>
                <div style={{position:'relative', width: '50px', height: 'inherit', float: 'left'}}>
                    <ArrowBackIosNewIcon style={{position:'relative', fontSize: '20px', paddingTop: '11px'}}/>
                </div>
                <div style={{width: 'calc(100% - 100px)', height: 'inherit', float: 'left'}} >
                    <p style={{height: '10px',fontSize: '10px', margin: '0', color:'#FFA64D'}}>Search Delivery Location</p>
                    <DebounceInput
                        placeholder="Type here to search location"
                        minLength={2}
                        debounceTimeout={500}
                        onChange={event => setSearchStr(event.target.value)}
                        style={{width: '100%', boxSizing: 'border-box',padding: '0', border: '0', borderBottom: '1px solid #FFA64D', height: '30px'}}  />
                    
                </div>
            </div>
        </div>
    );
}

export default AddressSearchModalHeader;

/**
 * <DebounceInput
                        placeholder="Type here to search location"
                        minLength={2}
                        debounceTimeout={500}
                        onChange={event => setSearchStr(event.target.value)}
                        style={{width: '100%', boxSizing: 'border-box',padding: '0', border: '0', borderBottom: '1px solid #FFA64D', height: '30px'}}  />
 */

                        /**
                         * <GooglePlacesAutocomplete 
                        apiKey={apiKey}
                        selectProps={{
                            onChange: (places) => {console.log(places)},
                          }}
                        style={{width: '100%', boxSizing: 'border-box',padding: '0', border: '0', borderBottom: '1px solid #FFA64D', height: '30px'}}
                    />
                         */

                        //https://maps.googleapis.com/maps/api/place/js/AutocompletionService.GetPredictionsJson?1sjanya&4sen-GB&15e3&21m1&2e1&callback=_xdc_._4cunf3&key=AIzaSyC_etEdOc1bGYD4JoUau1fM4-iT_XLBFg4&token=22888