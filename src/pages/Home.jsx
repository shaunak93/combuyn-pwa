import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import PageHeader from "../components/headers/PageHeader";
import PageBody from "../components/base/PageBody";
import Categories from "../components/Categories";
import Campaigns from "../components/Campaigns";
import FooterTabs from "../components/base/FooterTabs";
import AddressSelector from "../components/selectors/AddressSelector";
import AddressPanel from "../components/panels/AddressPanel";
import BottomDrawer from "../components/drawers/BottomDrawer";

function Home(props) {
  const [isAddressSelectorOpen, toggleAddressSelectorOpen] = useState(false);
  const isAddressSelected = useSelector(
    (state) => state.address && state.address.apartmentId
  );

  useEffect(() => {
    toggleAddressSelectorOpen(!isAddressSelected);
  }, [isAddressSelected]);

  const openSelectorModal = () => {
    toggleAddressSelectorOpen(true);
  };

  return (
    <>
      <PageHeader />
      <PageBody>
        <AddressPanel onClick={openSelectorModal} />
        <Categories />
        <Campaigns />
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
