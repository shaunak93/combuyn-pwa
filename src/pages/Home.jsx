import React, {useEffect, useState} from 'react';
import HeaderBar from '../components/base/HeaderBar';
import PageBody from '../components/base/PageBody';
import LocationPanel from '../components/LocationPanel';
import Categories from '../components/Categories';
import Campaigns from '../components/Campaigns';
import AllCampaignsModal from '../modals/AllCampaignsModal';
import CampaignModal from '../modals/CampaignModal';
import FooterTabs from '../components/base/FooterTabs';
import LoaderOverlay from '../components/base/LoaderOverlay';

import {getCampaignList} from '../apis/campaign'


function Home(props) {


    const [campaignDetailsList, setCampaignDetailsList] = useState([]);
    const [showAllActiveCampaigns, setShowAllActiveCampaigns] = useState(false);
    const [selectedCampaignId, setSelectedCampaignId] = useState(null);
    const [currentCoordinates, setCurrentCoordinates] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    const onCampaignCardClick = (id) => {
        setShowAllActiveCampaigns(false);
        setSelectedCampaignId(id)
    }

    const onCampaignModalClose = () => {
        setSelectedCampaignId(null)
    }

    const onShowAllCampaignsModal = () => {
        setShowAllActiveCampaigns(true)
    }

    const onCloseAllCampaignsModal = () => {
        setShowAllActiveCampaigns(false)
    }

    useEffect(() => {
        setIsLoading(true)
        getCampaignList({}, (err, res) => {
            setIsLoading(false)
            if(err){
                console.log(err)
            }else{
                let {count, results} = res;
                setCampaignDetailsList(results);  
            }
        })
    }, [])

    return (
        <>
            <HeaderBar/>

            <PageBody>
                    <LoaderOverlay show={isLoading}/>
                    <LocationPanel currentCoordinates={currentCoordinates} setCurrentCoordinates={setCurrentCoordinates} />
                    <Categories/>
                    {campaignDetailsList.length &&
                        <>
                            <Campaigns 
                                headerLabel={'Active campaigns'} 
                                campaignList={campaignDetailsList} 
                                showAllCampaigns={onShowAllCampaignsModal} 
                                onCardClick={onCampaignCardClick}
                            />
                            <AllCampaignsModal 
                                show={showAllActiveCampaigns}                                
                                headerLabel={'Active campaigns'} 
                                campaignList={campaignDetailsList} 
                                onCardClick={onCampaignCardClick}
                                onClose={()=>{setShowAllActiveCampaigns(false)}}
                            />
                        </>
                     }
            </PageBody>
            <FooterTabs value='home'/>
            <CampaignModal
                campaignId={selectedCampaignId}
                open={!!selectedCampaignId}
                initialState={'home'}
                onClose={onCampaignModalClose}
            />
        </>
        
    );
}

export default Home;
