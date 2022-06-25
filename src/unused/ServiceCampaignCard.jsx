import React from 'react';
import IconButton from '@mui/material/IconButton'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

import ShareIcon from '@mui/icons-material/Share';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

function ServiceCampaignCard(props) {
    let {campaignDetails, onClick, status, isFullWidth} = props;
    return (
        <div className="service-campaign-card" style={{position: 'relative', width: '232px', height: '226', borderRadius: '4px', backgroundColor:'#E6E6E6', marginRight: '15px'}}>
            <div style={{position: 'relative', width: '232px', position: 'relative', height:'136px', borderRadius: '4px'}}>
                <img style={{width: 'inherit', height:"inherit", borderRadius: '4px'}} src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80" alt="" />
                {/**
                 * <div style={{position: 'absolute', left: '6px', bottom: '0px', width: '28px', height:"38px"}}>
                    <IconButton style={{width: '28px', height:"28px", backgroundColor:'#F7F7F7'}} disabled={false} aria-label="bookmark" onClick={(e)=>{console.log(e)}} >
                        <FavoriteRoundedIcon style={{color: '#FD4C4C', fontSize: '16px'}}/>
                    </IconButton>
                    <p style={{width: '28px', height: '10', textAlign: 'center', color:'#F7F7F7', fontSize: '8px', fontWeight:'bold', margin: '0'}}>Save</p>
                </div>
                 */}
                <div style={{position: 'absolute', right: '6px', bottom: '10px', width: '75px', height:"30px"}}>
                    <Button style={{height: 'inherit', width: 'inherit', border: '2px solid #ffffff', borderRadius: '15px', fontSize: '12px', fontWeight: 'bold', textTransform: 'capitalize', backgroundColor:'#FFA64D', color: '#ffffff'}} 
                        variant="text" startIcon={<ShareIcon style={{fontSize: '15px'}}/>}
                    >
                      Share
                    </Button>
                 </div>
            </div>
            <div style={{width: '232px', height:'60px', borderRadius: '4px', backgroundColor:'#E6E6E6'}}>
                <Grid
                  container
                  spacing={0}

                >
                    <Grid item  xs={8} style={{padding: '10px 12px 0'}}>
                        <p style={{margin: '0', fontSize: '18px', fontWeight: 'bold'}}>Product</p>
                        <p style={{margin: '0', fontSize: '12px'}}>Brand, other</p>
                    </Grid>
                    <Grid item  xs={4} style={{padding: '10px 12px 0'}}>
                        <p style={{margin: '0', fontSize: '18px', fontWeight: 'bold'}}> &#8377;0000</p>
                        <p style={{margin: '0', fontSize: '10px'}}>
                            MRP: 
                            <span style={{textDecoration:'line-through', color: 'red'}}>
                                <span style={{color: '#000'}}>0000</span>
                            </span>
                        </p>
                    </Grid>
                    {status === 'upcoming' && 
                        <Grid item  xs={12} style={{padding: '4px 12px 0'}}>
                            <p style={{margin: '0', fontSize: '10px', textAlign: 'center'}}>
                                <span style={{ width: 'max-content',margin: '0'}}>Minimum Order Quantity</span>
                                <span style={{ width: 'max-content',color: '#3785B8', fontWeight: 'bold', margin: '0'}}>&nbsp; 000 Pcs</span>
                            </p>
                        </Grid>
                    }

                </Grid>
                
            </div>
            {status === 'active' && 
                <>
                    <div style={{position: 'absolute',left: '7px', top: '187px',  width: '214px', height:'10px', borderRadius: '7px', backgroundColor:'#ffffff', padding: '2px'}}>
                        <div style={{borderRadius: '5px',  width: '0px', height:'10px', backgroundColor:'#48C28B', minWidth: 'min-content'}}>
                            <p style={{color: '#ffffff', fontSize: '8px', width: 'fit-content', margin: '0', padding: '0 4px', fontWeight:'bold'}}>32%</p>
                        </div>
                    </div>
                    <div style={{width: '232px', height:'30px', borderRadius: '4px'}}>
                        <span style={{width: '100%', textAlign: 'center', display: 'block', paddingTop: '8px'}}>
                            <span style={{fontSize: '12px', margin: '0', fontWeight: 'bold'}}>Ends in: </span>
                            <span style={{fontSize: '12px', margin: '0', color: '#3785B8', fontWeight: '500'}}> 00 Days 00 Hours 00 Minutes</span>
                        </span>
                    </div>
                </>
                
            }

            {status === 'upcoming' && 
                <div style={{width: '232px', height:'30px', borderRadius: '4px'}}>
                    <span style={{width: '100%', textAlign: 'center', display: 'block', paddingTop: '8px'}}>
                        <span style={{fontSize: '12px', margin: '0', fontWeight: 'bold'}}>Starts in: </span>
                        <span style={{fontSize: '12px', margin: '0', color: '#3785B8', fontWeight: '500'}}> 00 Days 00 Hours 00 Minutes</span>
                    </span>
                </div>
            }

            {status !== 'finished' && 
                <div style={{width: '232px', height:'30px', backgroundColor: '#E6E6E6', textAlign: 'center'}}>
                    <Button style={{height: '22px', width: '205px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold', textTransform: 'capitalize', backgroundColor:'#F7F7F7', color: '#3785B8'}} 
                        variant="text"
                    >
                      Start Again
                    </Button>
                </div>
            }
        </div>
    );
}

export default ServiceCampaignCard;