import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SortOutlinedIcon from '@material-ui/icons/SortOutlined';
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Mail';
import MicIcon from '@material-ui/icons/Mic';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Avatar } from '@material-ui/core';
import { CustomDivider } from './custom/CustomDivider';
import { useHistory, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetContent,
  SetBoardItems,
  setQuerySearchValues,
} from '../../Action/Auth';
import { Link } from 'react-router-dom';
import { Notification } from '../../components/Notification';
import api from '../../apiCalls/api';
import queryString from 'query-string';
import { useGetNotifications } from '../../hooks/useGetNotifications';
import { HeaderLinksComponent } from '../components/header/HeaderLinksComponent';
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: '#414141',
    fontWeight: 700,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    border: '2px solid #717DB3',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#F7F9F8',
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    color: '#bebfbe',

    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function Navbar({ ToggleSideBar, location }) {
  const params = useLocation();
  const { boardId } = queryString.parse(params.search);
  const [notifiToggle, setNotifiToggle] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { projectName, user, searchText, documentType, status } = useSelector(
    (state) => state.Auth
  );
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { notificationData } = useGetNotifications();
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      className='mt-lg-4'
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>
        <Link to="/profile" className="nav-link p-0">
          Profile
        </Link>
      </MenuItem> */}
      <MenuItem
        onClick={() => {
          dispatch(resetContent());
          history.push('/sign-in');
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem> */}
      <MenuItem
        className='align-items-center'
        onClick={() => setNotifiToggle(!notifiToggle)}
      >
        <IconButton aria-label='show 11 new notifications' color='inherit'>
          <Badge
            badgeContent={notificationData?.unreadCount ?? 0}
            color='secondary'
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p className='mb-0'>Notifications</p>
      </MenuItem>
      <Notification
        className={` ${notifiToggle ? 'd-block' : 'd-none'}`}
        onClose={() => setNotifiToggle(!notifiToggle)}
        open={notifiToggle}
        readData={notificationData?.read}
        unreadData={notificationData?.unread}
        totalNotifications={
          notificationData?.unreadCount + notificationData?.readCount
        }
      />
      {/* <MenuItem
        onClick={handleProfileMenuOpen}
        className="d-flex align-items-baseline"
      >
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar variant="rounded">H</Avatar>
        </IconButton>
        <p>Profile</p>
      </MenuItem> */}
    </Menu>
  );
  const searchItems = () => {
    dispatch(
      SetBoardItems({
        boardId,
        text: searchText,
        documentType: documentType.label,
        status: status.label,
      })
    );
  };
  return (
    <>
      <div className={`position-sticky fixed-top ${classes.grow}`}>
        <AppBar position='static' color='Inherit' elevation='0'>
          <Toolbar disableGutters className='pr-md-4'>
            <IconButton
              edge='start'
              className={` mr-auto ${classes.menuButton}`}
              color='inherit'
              onClick={ToggleSideBar}
            >
              <SortOutlinedIcon className='text-primary' />
            </IconButton>
            <Typography
              className={`col text-center d-none d-md-flex align-items-center ${classes.title}`}
              variant='h5'
              noWrap
            >
              <span className='mr-5'>{projectName ?? ''}</span>
              {(history.location.pathname === '/dashboard-items' ||
                history.location.pathname === '/invite-members' ||
                (history.location.pathname === '/dashboard-items/view-item' &&
                  boardId)) && <HeaderLinksComponent />}
            </Typography>

            {/* <div className={classes.grow} /> */}

            {history.location.pathname === '/dashboard-items' && (
              <>
                <form
                  className={`col-md ${classes.search}`}
                  onSubmit={(e) => {
                    e.preventDefault();
                    searchItems();
                  }}
                >
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder='Search…'
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    value={searchText}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={({ target }) => {
                      if (!target.value) {
                        dispatch(
                          SetBoardItems({
                            boardId,
                            text: '',
                            documentType: documentType.label,
                            status: status.label,
                          })
                        );
                      }
                      dispatch(
                        setQuerySearchValues('searchText', target.value)
                      );
                    }}
                  />
                  <div
                    className='position-absolute  mt-1 mr-2'
                    style={{ color: '#bebfbe', top: 0, right: 0 }}
                  >
                    {/* <MicIcon /> */}
                  </div>
                </form>
              </>
            )}
            <div className={classes.sectionDesktop}>
              {/* <IconButton
                className="p-3"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton> */}
              <IconButton
                className='p-3'
                aria-label='show 17 new notifications'
                color='inherit'
                onMouseEnter={() => setNotifiToggle(true)}
                onMouseLeave={() => setNotifiToggle(false)}
              >
                <Badge
                  badgeContent={notificationData?.unreadCount ?? 0}
                  color='secondary'
                >
                  <NotificationsIcon />
                </Badge>
                <Notification
                  className={` ${notifiToggle ? 'd-block' : 'd-none'}`}
                  readData={notificationData?.read}
                  unreadData={notificationData?.unread}
                  totalNotifications={
                    notificationData?.unreadCount + notificationData?.readCount
                  }
                />
              </IconButton>
              <CustomDivider color='#545454' />

              <IconButton
                edge='end'
                aria-label='account of current user'
                aria-controls={menuId}
                aria-haspopup='true'
                onClick={handleProfileMenuOpen}
                color='inherit'
              >
                <Avatar variant='rounded'>
                  <img src={user.imageUrl} alt='' className='w-100 h-100' />
                </Avatar>
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label='show more'
                aria-controls={mobileMenuId}
                aria-haspopup='true'
                onClick={handleMobileMenuOpen}
                color='inherit'
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <AppBar
          className='d-md-none'
          position='static'
          color='Inherit'
          elevation='0'
        >
          <div className='py-2 d-flex justify-content-between'>
            <span className='mr-5'>{projectName ?? ''}</span>
            {(history.location.pathname === '/dashboard-items' ||
              history.location.pathname === '/invite-members' ||
              (history.location.pathname === '/dashboard-items/view-item' &&
                boardId)) && <HeaderLinksComponent />}
          </div>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
    </>
  );
}
