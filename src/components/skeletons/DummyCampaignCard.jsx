import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// 1F1D36 E9A6A6
// 1C0C5B C996CC
// 2D2424 E0C097
// 382933 A4B494

function DummyCampaignCard({ campaign, isClickable, index }) {
  return (
    <div style={{ paddingTop: "20px" }}>
      <SkeletonTheme baseColor="#E0E0E0" highlightColor="#FFFFFF">
        <div
          style={{
            backgroundColor: "#F0F0F0",
            borderRadius: "4px",
            height: "auto",
            padding: "10px",
          }}
        >
          <div style={{ height: "auto", width: "100%" }}>
            <h2 style={{ margin: "0", width: "47%", float: "left" }}>
              <Skeleton height={30} />
            </h2>
            <h2 style={{ margin: "0", width: "47%", float: "right" }}>
              <Skeleton height={30} />
            </h2>
          </div>
          <div style={{ height: "auto", width: "100%" }}>
            <Skeleton height={200} />
          </div>
          <div style={{ height: "auto", width: "100%" }}>
            <Skeleton height={70} />
          </div>
        </div>
      </SkeletonTheme>
      {/* <div style={{height: '30px'}}>
                <div style={{height: '25px', float: 'right', backgroundColor: colorPallete.background, padding: '5px 10px 0'}}>
                    <span style={{color: colorPallete.font, fontWeight: 'bold', fontSize: '14px'}}>
                        <TimerOutlinedIcon style={{color: '#fff', fontSize: '16px'}}/>
                        {timeLeftToEndString}
                    </span>
                </div>
            </div>
            <div style={{width: 'inherit', height:'auto'}}>
                <img style={{width: '100%', height:'auto'}} src={image}></img>
            </div>
            <div style={{ height: 'fit-content', position: 'relative', backgroundColor: colorPallete.background, color: colorPallete.font, fontWeight: 'bold', fontSize: '14px'}}>
                <span style={{width: 'calc(100% - 50px)', padding: '15px 10px', display: 'inline-block'}}>{smallDescription}</span>
                <div 
                    style={{width: '20px', height: '20px', position:'absolute',
                        borderRadius: '15px', border: '2px solid #fff',
                        top: 'calc(50% - 10px)', right: '10px',
                    }}
                >
                    <ArrowForwardIcon style={{color: '#fff', fontSize: '20px' }}/>
                </div>                
            </div> */}
    </div>
  );
}

export default DummyCampaignCard;
