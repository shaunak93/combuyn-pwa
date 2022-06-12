import React, { useEffect, useState } from "react";
import PageHeader from "../components/headers/PageHeader";
import PageBody from "../components/base/PageBody";
import LocationPanel from "../components/panels/LocationPanel";
import Categories from "../components/Categories";
import Campaigns from "../components/Campaigns";
import AllCampaignsModal from "../modals/AllCampaignsModal";
import FooterTabs from "../components/base/FooterTabs";
import LoaderOverlay from "../components/base/LoaderOverlay";

import AddressSelector from "../components/selectors/AddressSelector";
import AddressPanel from "../components/panels/AddressPanel";
import { getCampaignList } from "../apis/campaign";

import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import BottomDrawer from "../components/drawers/BottomDrawer";

function Home(props) {
  const [campaignDetailsList, setCampaignDetailsList] = useState([]);
  const [showAllActiveCampaigns, setShowAllActiveCampaigns] = useState(false);
  const [currentCoordinates, setCurrentCoordinates] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddressSelectorOpen, toggleAddressSelectorOpen] = useState(false);
  const history = useHistory();
  const isAddressSelected = useSelector(
    (state) => state.address && state.address.apartmentId
  );

  useEffect(() => {
    console.log("====================================");
    console.log({ isAddressSelected });
    console.log("====================================");
    toggleAddressSelectorOpen(!isAddressSelected);
  }, [isAddressSelected]);
  //const { societyId, towerId, flatNumber } = currentAddress;

  const onCampaignCardClick = (id) => {
    setShowAllActiveCampaigns(false);
    history.push(`/campaign/${id}`);
  };

  const onShowAllCampaignsModal = () => {
    setShowAllActiveCampaigns(true);
  };

  const onCloseAllCampaignsModal = () => {
    setShowAllActiveCampaigns(false);
  };

  const openSelectorModal = () => {
    toggleAddressSelectorOpen(true);
  };

  useEffect(() => {
    //setIsLoading(true);
    //getCampaignList({}, (err, res) => {
    // setIsLoading(false);
    // if (err) {
    //   console.log(err);
    // } else {
    //   let { count, results } = res;
    //   setCampaignDetailsList(results);
    // }
    //});
  }, []);

  return (
    <>
      <PageHeader />
      <PageBody>
        <LoaderOverlay show={isLoading} />
        {/*<LocationPanel currentCoordinates={currentCoordinates} setCurrentCoordinates={setCurrentCoordinates} />*/}
        <AddressPanel onClick={openSelectorModal} />
        <Categories />
        <Campaigns
          campaignList={campaignDetailsList}
          onCardClick={onCampaignCardClick}
        />
        {/* {!campaignDetailsList.length &&
                        
                     } */}
      </PageBody>
      <FooterTabs value="home" />
      <BottomDrawer
        open={isAddressSelectorOpen}
        key={"societ-selector-drawer"}
        onClose={
          isAddressSelected ? () => toggleAddressSelectorOpen(false) : null
        }
        className={"address-selector-drawer"}
      >
        <AddressSelector />
      </BottomDrawer>
    </>
  );
}

export default Home;
