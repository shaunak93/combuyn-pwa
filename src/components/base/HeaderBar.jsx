import React from 'react';

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import combuynIcon from '../../assets/combuynIcon.png';
import combuynBanner from '../../assets/combuynIcon.png';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography'
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

function HeaderBar(props) {
    return (
        <AppBar className="appBar" position="static">
            <Toolbar className="toolbar">
                <Typography className="font-16 font-bold float-l" style={{color: '#F7F7F7'}}>
                    COMBUYN
                </Typography>
                {/*<img style={{height: '40px'}} src={combuynIcon}/>
                <div className="searchBar">
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search Google Maps"
                        inputProps={{ 'aria-label': 'search' }}
                        className="input-base"
                    />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" className="icon">
                        <SearchIcon />
                    </IconButton>
                </div>*/}
            </Toolbar>
        </AppBar>
    );
}

export default HeaderBar;