import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BasicModal from "../components/base/BasicModal";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const mapStyles = {
  width: "100%",
  height: "100%",
};

const MapContainerModal = (props) => {
  const { isOpen, apiKey, currentCoordinates, onLocationUpdate, onBackClick } =
    props;
  const [lat, setLat] = useState(currentCoordinates.lat);
  const [long, setLong] = useState(currentCoordinates.long);

  const onClickContinue = () => {
    onLocationUpdate({ lat, long });
  };

  return (
    <BasicModal open={isOpen} className="map-container-modal">
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        fullscreenControl={false}
        zoomControl={false}
        defaultCenter={{
          lat: lat,
          lng: long,
        }}
        defaultZoom={16}
        onDragEnd={(map) => {
          setLat(map.center.lat());
          setLong(map.center.lng());
        }}
        options={{
          fullscreenControl: false,
          zoomControl: false,
        }}
      ></GoogleMapReact>
      {!!onBackClick && (
        <ArrowBackIosNewIcon
          onClick={onBackClick}
          className="arrow-back-icon"
        />
      )}
      <LocationOnIcon className="location-icon" />
      <div className="confirm-location-div" onClick={onClickContinue}>
        Confirm Location
      </div>
    </BasicModal>
  );
};
export default MapContainerModal;
