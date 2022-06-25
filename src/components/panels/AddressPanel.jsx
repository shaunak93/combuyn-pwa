import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function AddressPanel(props) {
  const { onClick } = props;
  const currentAddress = useSelector((state) => state.address);
  let {
    //societyId,
    apartmentName,
    //towerId,
    towerName,
    flatNumber,
  } = currentAddress;
  useEffect(() => {
    console.log("AddressPanel", { apartmentName, towerName, flatNumber });
  });
  return (
    <div className="location-panel" onClick={onClick}>
      <LocationOnIcon className="icon" />
      <span className="location-span">
        {`${apartmentName || "-"} > ${towerName ? towerName + "-" : ""}${
          flatNumber || "-"
        }`}
      </span>
    </div>
  );
}

export default AddressPanel;
