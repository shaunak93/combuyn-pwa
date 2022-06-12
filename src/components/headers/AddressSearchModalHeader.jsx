import React, { useState, useEffect } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { DebounceInput } from "react-debounce-input";
import { getAddressSuggestions } from "../../utils/googleMaps";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

function AddressSearchModalHeader(props) {
  const { setSearchStr, onBackClick } = props;
  return (
    <div className="address-search-modal-header">
      <div className="container">
        <div className="back-div" onClick={onBackClick || (() => {})}>
          {onBackClick && <ArrowBackIosNewIcon className="icon" />}
        </div>
        <div style={{}}>
          <p className="label">Search Delivery Location</p>
          <DebounceInput
            className="input"
            placeholder="Type here to search location"
            minLength={2}
            debounceTimeout={500}
            onChange={(event) => setSearchStr(event.target.value)}
            style={{}}
          />
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
