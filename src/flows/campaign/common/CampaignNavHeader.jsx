import React from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

function CampaignNavHeader(props) {
    let {onBackClick} = props;
    const onBackClickEvent = (e) => {
        e.stopPropagation();
        onBackClick();
    }
    return (
        <div style={{position: 'relative', height: '56px', width: '100%', padding: '8px 30px', boxSizing:'border-box', boxShadow: '0px 1px 5px #d2d1d1'}}>
            <div style={{color: '#3785B8', height: '40px'}}>
                <div onClick={onBackClickEvent} style={{position:'relative', width: 'max-content', height: 'inherit', float: 'left'}}>
                    <ArrowBackIosNewIcon style={{position:'relative', fontSize: '16px', paddingTop: '11px'}}/>
                    <p style={{position:'absolute', top: '10px', left: '18px', fontSize: '16px', fontWeight: '900', margin: '0', display: 'inline-block'}}>Back</p>
                </div>
                {/*<div style={{width: 'max-content', height: 'inherit', float: 'right'}} >
                    <AccountCircleIcon style={{fontSize: '30px', paddingTop: '6px'}}/>
                    &nbsp; &nbsp;
                    <MenuRoundedIcon style={{fontSize: '30px', paddingTop: '6px'}}/>
                </div>*/}
            </div>
        </div>
    );
}

export default CampaignNavHeader;