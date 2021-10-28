import React from 'react';
import Grid from '@material-ui/core/Grid'
import ProductCampaignCard from './cards/ProductCampaignCard'

function Campaigns(props) {
    let {headerLabel, campaignList, showAllCampaigns, onCardClick} = props;
    return (
        <Grid container spacing={1} className="campaigns">
            <Grid item xs={12} className="header" style={{marginLeft: '30px'}}>
                <Grid container spacing={1}>
                    <Grid item xs={9}>
                        <p className="font-16 font-bold margin-0 width-max-content ">{headerLabel}</p>
                    </Grid>
                    <Grid item xs={3}>
                        <p className="font-12 font-bold margin-0 width-max-content float-r view-all"
                            onClick={showAllCampaigns}
                        >
                                View all
                        </p>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className="container">
                <div style={{minWidth: '30px', height: '100%'}}></div>
                {campaignList.map((campaign)=> <ProductCampaignCard campaignDetails={campaign} isFullWidth={false} onClick={onCardClick}/>)}
            </Grid>
        </Grid>
    );
}

export default Campaigns;