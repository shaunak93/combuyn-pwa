import React, { useState } from "react";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

function PageHeader(props) {
  const [searchOpen, setSearchOpen] = useState(props.searchOpen || false);
  const [searchString, setSearchString] = useState(props.searchString || "");

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchString("");
  };
  return (
    <div className="page-header">
      <div className={`banner-div ${searchOpen ? "hidden" : ""}`}>
        <img
          className="banner-img"
          alt="loading..."
          src="./combuynBanner.png"
        />
        <div className="banner-badges">
          <Badge
            className="badge"
            color="primary"
            onClick={() => setSearchOpen(true)}
          >
            <SearchIcon className="icon" />
          </Badge>
          <Badge
            className="badge"
            overlap="circular"
            variant="dot"
            color="primary"
          >
            <NotificationsIcon className="icon" />
          </Badge>
        </div>
      </div>
      <div className={`search-div ${!searchOpen ? "hidden" : ""}`}>
        <input
          className="search-input"
          type="text"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
        <Badge className="badge" onClick={closeSearch}>
          <CancelOutlinedIcon className="icon" />
        </Badge>
      </div>
    </div>
  );
}

export default PageHeader;
