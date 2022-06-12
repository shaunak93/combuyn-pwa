import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

const TABS_LIST = [
    {key: 'profile', label: 'Profile', icon: <PersonIcon/>, path: '/profile'},
    {key: 'home', label: 'Home', icon: <HomeIcon/>,  path: '/home'},
    {key: 'menu', label: 'Menu', icon: <MenuRoundedIcon/>, path: '/menu'}
]

export {TABS_LIST};