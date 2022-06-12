import React, { useEffect, useState } from "react";
import AddressSearchModalHeader from "../components/headers/AddressSearchModalHeader";
import BasicModal from "../components/base/BasicModal";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import PinDropIcon from "@mui/icons-material/PinDrop";
import {
  getAddressSuggestions,
  getLatLongByPlaceID,
} from "../utils/googleMaps";

function AddressSearchModal(props) {
  const {
    isOpen,
    userAddresses,
    openMap,
    onLocationUpdate,
    apiKey,
    onBackClick,
  } = props;
  const [searchStr, setSearchStr] = useState("");
  const [searchedAddresses, setSearchedAddresses] = useState([]);

  useEffect(() => {
    if (searchStr.trim()) {
      getAddressSuggestions(searchStr, (res) => {
        setSearchedAddresses(res);
      });
    }
  }, [searchStr]);

  const updateCurrentLocation = ({ place_id, main_text, secondary_text }) => {
    onLocationUpdate({ place_id, main_text, secondary_text });
  };

  const getAddressCards = ({ addresses, areSavedAddresses }) => {
    return addresses.map((address) => (
      <div
        className="address-card"
        onClick={(e) => {
          e.preventDefault();
          updateCurrentLocation({
            place_id: address.place_id,
            ...address.structured_formatting,
          });
        }}
      >
        <div className="icon-div">
          <PinDropIcon className="icon" />
        </div>
        <div className="label-div">
          <p claaName="label-1">{address.structured_formatting.main_text}</p>
          <p claaName="label-2">
            {address.structured_formatting.secondary_text ||
              address.structured_formatting.main_text}
          </p>
        </div>
      </div>
    ));
  };

  return (
    <BasicModal open={isOpen} className="address-search-modal">
      <AddressSearchModalHeader
        setSearchStr={setSearchStr}
        onBackClick={onBackClick}
      />

      <div className="current-address-card" onClick={openMap}>
        <div className="icon-div">
          <GpsFixedIcon className="icon" />
        </div>
        <div className="label-div">
          <div className="label">Current Location</div>
        </div>
      </div>
      {searchedAddresses.length > 0 &&
        getAddressCards({
          addresses: searchedAddresses,
          areSavedAddresses: false,
        })}
    </BasicModal>
  );
}

export default AddressSearchModal;
