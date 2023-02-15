import React, { useState, useEffect, useContext } from 'react';
import { AppBar, Toolbar, styled, Typography, Box, Menu, MenuItem, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';
import { adminlogout } from '../routes/api';
import '../hide.css';
import { getUser, getImageUrl, removeToken } from '../utils/localStorage';
import AuthContext from '../store/AuthContext';
const Tabs = styled(NavLink)`
font-size: 15px;
margin-right: 20px;
color:white;
text-decoration:none;
text-transform: capitalize;
`
const Navbar = () => {
  const navigate = useNavigate();
  const authCTX = useContext(AuthContext);
  const isLoggedIn = authCTX.isLoggedIn;
  const logoutUser = authCTX.logoutUser;
  const [email, setEmail] = useState('');
  const [name, setName] = useState();
  const [logoutToken, setLogoutToken] = useState(false);
  const [userId, setUserid] = useState();
  const [imageLoggedInUrl, setImageLoggedInUrl] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const URL = getImageUrl();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  /*const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );*/

  const onLogout = async (e) => {
    adminlogout().then(response => {
      setTimeout(() => window.location.reload(), 3000);
      logoutUser();
      removeToken('admintoken');
      removeToken('adminuser');
      setLogoutToken()
      navigate('/adminlogin');
      toast.success(response.data.message, {
        position: "bottom-right",
        hideProgressBar: false,
        progress: undefined,
      });
      handleClose();

    });
  }
  useEffect(() => {
    ///using funda of local storage it will failwhen logged in used will update their image which is coming from cloudinary cloud of online managing images, documents
    //  const token = getToken();
    // alert(isLoggedIn);
    const user = getUser();
    if (user) {
      setUserid(user.id);
      //for updating navbar conents after login getting content in userId
      setEmail(user.email);
      setName(user.name);
      //  alert(`${URL}/admin/images/${user.image}`)
      if (user.image === null || user.image === '') {
        setImageLoggedInUrl(`${URL}/admin/images/no-image.jpg`);
      }
      else {
        setImageLoggedInUrl(`${URL}/admin/images/${user.image}`);
      }
      // Promise.resolve(getUserById(initialValue.id)).then((result)=>setImageLoggedInUrl(result.data.Image.url));
    }
  }, [isLoggedIn]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant='h5' component="div" sx={{ flexGrow: 1 }}>React jS with Laravel9 Admin Panel</Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Tabs to="/books" style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }} className={`${!userId ? "mystyle" : ""}`} >All Books</Tabs>
            {/* <Tabs to="/customers" style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }} className={`${!userId ? "mystyle" : ""}`} >All Customers</Tabs> */}
          </Typography>
          <Tabs color="inherit" to="/adminlogin" style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }} className={`${userId ? "mystyle" : ""}`} >Login</Tabs> <Tabs color="inherit" to="/adminregister" className={`${userId ? "mystyle" : ""}`} style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Sign Up</Tabs>

          <div className={`${!userId ? "mystyle" : ""}`}>

            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            ><Tabs >{name}</Tabs>
              <img src={imageLoggedInUrl} alt='Logged in user' className='bag-quantity' />{/*<Divider variant="middle"/>*/}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }} className={`${!userId ? "mystyle" : ""}`}
            >
              {/* <MenuItem onClick={(e) => onLogout(e)}>Profile</MenuItem> */}
              <MenuItem onClick={(e) => onLogout(e)}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar;