import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { getApartmentList } from "../../apis/apartments";
import { updateAddressAction } from "../../store/actions/addressActions";

const CustomeApartmentOption = (args) => {
  console.log(args);
  let { data, setValue } = args;
  const onClick = () => {
    console.log({ data });
    setValue(data);
  };
  return (
    <div
      onClick={onClick}
      className="custom-apartment-option"
      style={{
        display: "inline-block",
        width: "100%",
        padding: "0 10px",
        boxSizing: "border-box",
      }}
    >
      <span
        className="apartment-name"
        style={{
          float: "left",
          color: "#3785B8",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        {data.label}
      </span>
      <span
        className="area-name"
        style={{
          float: "right",
          color: "#555",
          fontSize: "13px",
          fontWeight: "bold",
        }}
      >
        {data.cluster}
      </span>
    </div>
  );
};

function AddressSelector(props) {
  const [apartmentMasterlist, setApartmentMasterList] = useState([]);
  const [apartmentList, setApartmentList] = useState([]);
  const [apartmentSelectedOption, setApartmentSelectedOption] = useState(null);
  const [towerList, setTowerList] = useState([]);
  const [towerSelectedOption, setTowerSelectedOption] = useState(null);
  const [address, setAddress] = useState({});
  const currentAddress = useSelector((state) => state.address);
  const dispatch = useDispatch();

  useEffect(() => {
    getApartmentList((err, data) => {
      setApartmentMasterList(data || []);
    });
  }, []);

  useEffect(() => {
    let { apartmentId, towerId, flatNumber } = currentAddress;
    setAddress({ apartmentId, towerId, flatNumber });
  }, [currentAddress]);

  useEffect(() => {
    let aprtList = apartmentMasterlist
      .filter((aprt) => aprt?.status && aprt?.status.toLowerCase() === "active")
      .map((aprt) => {
        let { id, name, cluster, clusterName } = aprt;

        return { value: id, label: name, cluster: clusterName || cluster };
      });
    setApartmentList(aprtList);
    if (address?.apartmentId) {
      setApartmentSelectedOption(
        aprtList.find((aprt) => aprt.value === address.apartmentId)
      );
    }
  }, [address.apartmentId, apartmentMasterlist]);

  useEffect(() => {
    if (address.apartmentId) {
      let selectedApartment = apartmentMasterlist.find(
        (aprt) => aprt.id === address.apartmentId
      );
      let twrList = (selectedApartment?.towers || [])
        .filter((twr) => twr?.status && twr?.status.toLowerCase() === "active")
        .map((twr) => {
          let { _id, name } = twr;

          return { value: _id, label: name };
        });
      setTowerList(twrList);
      if (address?.towerId) {
        setTowerSelectedOption(
          twrList.find((twr) => twr.value === address.towerId)
        );
      } else {
        setTowerSelectedOption(null);
      }
    }
  }, [address.apartmentId, address.towerId, apartmentMasterlist]);

  const onApartmentSelect = (option) => {
    let aprtId = option.value;
    setAddress({ apartmentId: aprtId });
    setApartmentSelectedOption(option);
  };

  const onTowerSelect = (option) => {
    let twrId = option.value;
    setAddress({
      apartmentId: address.apartmentId,
      towerId: twrId,
    });
    setTowerSelectedOption(option);
  };

  const onFlatNumberUpdate = (event) => {
    let flatNumber = event.target.value;
    setAddress({
      apartmentId: address.apartmentId,
      towerId: address.towerId,
      flatNumber: flatNumber,
    });
  };

  const onSaveClick = () => {
    if (address.apartmentId && address.towerId && address.flatNumber) {
      let apartmentObject = apartmentMasterlist.find(
        (aprt) => aprt.id === address.apartmentId
      );
      let towerObj = (apartmentObject?.towers || []).find(
        (twr) => twr._id === address.towerId
      );
      dispatch(
        updateAddressAction({
          apartmentId: address.apartmentId,
          towerId: address.towerId,
          flatNumber: address.flatNumber,
          apartmentName: apartmentObject.name,
          towerName: towerObj.name,
        })
      );
    }
  };

  useEffect(() => {}, []);
  return (
    <div className="address-selector">
      <div className="header">Residential Address</div>
      <br />
      <Select
        isSearchable
        loadingMessage
        maxMenuHeight
        isFocused
        onChange={onApartmentSelect}
        options={apartmentList}
        placeholder="Select apartment"
        filterOption={(option, inputValue) => {
          return option.label.includes(inputValue.trim());
        }}
        value={apartmentSelectedOption}
        components={{ Option: CustomeApartmentOption }}
      />
      <br />
      <Select
        isSearchable
        loadingMessage
        maxMenuHeight
        onChange={onTowerSelect}
        options={towerList}
        placeholder="Select tower"
        filterOption={(option, inputValue) => {
          return option.label.includes(inputValue.trim());
        }}
        isDisabled={!address.apartmentId}
        value={towerSelectedOption}
      />
      <br />
      <div className="flat-input-div">
        <input
          type="text"
          value={address.flatNumber || ""}
          onChange={onFlatNumberUpdate}
          className="flat-input"
          placeholder="Enter flat number"
          disabled={!address.towerId}
        />
      </div>
      {JSON.stringify(address)}
      <button
        className={`save-button ${!address.flatNumber ? "disabled" : ""}`}
        onClick={onSaveClick}
      >
        Save
      </button>
    </div>
  );
}

export default AddressSelector;
