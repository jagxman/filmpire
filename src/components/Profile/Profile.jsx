import React, {useEffect} from 'react'
import { Typography, Button, Box } from '@mui/material';
import {useSelector } from "react-redux";
import { ExitToApp } from '@mui/icons-material';
import {userSelector } from "../../features/auth";

//Get Access to Profile or ID from redux State
// display in the profile component.
const Profile = () => {

  const favMovies = [];
  const logout = () =>{

    localStorage.clear();

    window.location.href = "/";
  };

  const { user } = useSelector(userSelector);
  return (
    <Box>
      <Box display= "flex" justifyContent="space-between">
      <Typography variant='h4' gutterBottom>My Profile</Typography>
      <Button color='inherit' onClick={logout}> Logout &nbsp; <ExitToApp/> </Button>
      </Box>
      {!favMovies.length
      ? <Typography variant='h5'> Add Fav or watchlist some movies to see them here!</Typography>
      : <Box> Fav Movies</Box>
      }
    </Box>
  )
}

export default Profile;