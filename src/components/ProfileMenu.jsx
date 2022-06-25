import React from "react";
import { useSelector } from "react-redux";
import RightArrow from "../assets/rightArrow.png";

function ProfileMenu(props) {
  let { onMenuOptionClick } = props;
  const user = useSelector((state) => state && state.user);

  return (
    <div className="profile-menu">
      <div className="user-details-div">
        <div>
          <span className="name">{user.name}</span>
          <p className="other-details">
            {" "}
            {user.mobile} | {user.email}{" "}
          </p>
        </div>
        <div className="edit-button">Edit</div>
      </div>
      {/* <div onClick={() => {onMenuOptionClick('addresses')}} style={{boxSizing: 'border-box', height: '50px', margin: '10px 30px 0', backgroundColor: '#E6E6E6', borderRadius: '4px', padding: '10px 15px'}}>
                <div style={{display: 'inline-block', float: 'left'}}>
                    <p style={{margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#3785B8'}}>Address</p>
                    <p style={{margin: 0, fontSize: '10px', fontWeight: 'medium', color: '#999999'}}>Address</p>
                </div>
                <div  style={{display: 'inline-block', float: 'right', marginTop: '7px'}}>
                    <img src={RightArrow}/>
                </div>
            </div> */}
      <div className="profile-option-list">
        <div
          onClick={() => {
            onMenuOptionClick("orders");
          }}
          className="profile-option-div"
        >
          <div>
            <p className="option-title">My orders</p>
            <p className="option-description">Active orders & Past orders</p>
          </div>
          <div className="select-button">
            <img src={RightArrow} alt="loading..." />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileMenu;
