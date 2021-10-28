import React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {TABS_LIST} from '../../constants/tabs';

function FooterTabs(props) {
    let {value, onChange} = props;

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