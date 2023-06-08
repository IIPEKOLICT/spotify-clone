import { useState, Children, createElement, ReactElement, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Toolbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AiOutlineMessage } from 'react-icons/ai';
import { GiMusicSpell } from 'react-icons/gi';
import { FaUserFriends } from 'react-icons/fa';
import { MdOutlineVideoLibrary } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { BiNews } from 'react-icons/bi';
import { HiOutlinePhoto } from 'react-icons/hi2';
import { nav_item } from '../constants';
import { useAppSelector } from '../hooks/redux';
import { TextComponent } from '../common/text/TextComponent';
import { NavItem, RoutePath } from '../constants/enums';

const drawerWidth = 260;

interface IProps {
  active?: RoutePath;
  children: ReactElement;
}
const Slot: FC<{
  name: 'content';
  children: ReactElement;
}> = () => null;

const icons: Record<NavItem, ReactElement> = {
  [NavItem.PROFILE]: <CgProfile color="white" size="20" />,
  [NavItem.NEWS]: <BiNews color="white" size="20" />,
  [NavItem.MESSENGER]: <AiOutlineMessage color="white" size="20" />,
  [NavItem.FRIENDS]: <FaUserFriends color="white" size="20" />,
  [NavItem.MUSIC]: <GiMusicSpell color="white" size="20" />,
  [NavItem.VIDEOS]: <MdOutlineVideoLibrary color="white" size="20" />,
  [NavItem.PHOTOS]: <HiOutlinePhoto color="white" size="20" />,
};

const navbar_icon = (navItem: NavItem) =>
  createElement('div', { style: { display: 'flex', alignItems: 'center' } }, icons[navItem]);

export const NavbarComponent = (props: IProps) => {
  const userInfo = useAppSelector((state) => state.auth.user);
  const { children, active } = props;
  const childrenArray = Children.toArray(children) as unknown as ReactElement[];
  const content = childrenArray.find((child) => child?.props?.name === 'content');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const redirect = (route: RoutePath) => {
    navigate(route);
  };

  const drawer = (
    <List sx={{ paddingX: '10px' }}>
      <ListItem key="0" disablePadding sx={{ marginBottom: '40px' }}>
        <ListItemButton sx={{ paddingX: '0' }}>
          <ListItemIcon sx={{ justifyContent: 'center' }}>
            <Avatar alt="avatar" src={userInfo?.profilePicture}></Avatar>
          </ListItemIcon>
          <TextComponent
            color="white"
            text={`${userInfo?.firstName} ${userInfo?.lastName}`}
            style={{
              fontSize: { xs: '14px', sm: '18px' },
            }}
          />
        </ListItemButton>
      </ListItem>
      {nav_item.map(({ name, route }, index: number) => (
        <ListItem key={index.toString()} disablePadding sx={{ marginY: '15px' }}>
          <ListItemButton
            sx={{
              paddingX: '0',
              borderRadius: '25px',
              backgroundColor: `${route.toUpperCase() === active?.toUpperCase() && '#233866'}`,
              '&:hover': {
                backgroundColor: `${route.toUpperCase() !== active?.toUpperCase() ? '#5a74ac' : '#233866'}`,
              },
            }}
            onClick={() => redirect(route)}
          >
            <ListItemIcon sx={{ justifyContent: 'center' }}>{navbar_icon(name)}</ListItemIcon>
            <TextComponent
              color="white"
              text={name}
              style={{
                fontSize: { xs: '14px', sm: '18px' },
              }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          display: { xs: 'block', sm: 'none' },
          backgroundColor: 'var(--main-background)',
          boxShadow: 'none',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          display: { xs: 'none', sm: 'block' },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            '& .MuiPaper-root': { backgroundColor: 'var(--main-background)' },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            '& .MuiPaper-root': { backgroundColor: 'var(--main-background)' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px - 48px)` },
          marginTop: { xs: '56px', sm: '0' },
          overflowY: 'auto',
          background: 'white',
          position: 'relative',
          '&::-webkit-scrollbar': {
            width: '15px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#c5d2ea !important',
            borderRadius: '10px',
            border: '3px solid #e6edf2',
          },
          '&::-webkit-scrollbar-track': {
            background: '#e6edf2',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#5a74ac !important',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            wordBreak: 'break-word',
            width: '100%',
            position: 'relative',
          }}
        >
          <slot name="content">{content?.props?.children}</slot>
        </Box>
      </Box>
    </Box>
  );
};

NavbarComponent.Slot = Slot;
