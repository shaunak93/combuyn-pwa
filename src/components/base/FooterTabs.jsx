import React from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {TABS_LIST} from '../../constants/tabs';

function FooterTabs(props) {
    let {value} = props;
    const history = useHistory();
    
    const onChange = (newValue) => {
        let selectedTab = TABS_LIST.find((tab) => tab.key == newValue);
        console.log(selectedTab,  selectedTab.path);
        if(selectedTab && selectedTab.path){
            history.push(selectedTab.path);
        }
    }

    return (
        <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
               onChange && onChange(newValue);
            }}
        >
            {TABS_LIST.map(tab => <BottomNavigationAction value={tab.key} label={tab.label} icon={tab.icon} />)}
        </BottomNavigation>
    );
}

export default FooterTabs;