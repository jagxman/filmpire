import React, {useEffect} from 'react'
import { Typography, Button, Box } from '@mui/material';
import {useSelector } from "react-redux";
import { ExitToApp } from '@mui/icons-material';
import {userSelector } from "../../features/auth";
import { useGetListQuery } from "../../services/TMDB";
import { RatedCards } from "..";

//Get Access to Profile or ID from redux State
// display in the profile component.
const Profile = () => {

  const { user } = useSelector(userSelector);
  const {data: favMovies, refetch: refetchFavs} = useGetListQuery({listName: 'favorite/movies', accountID: user.id, sessionID: localStorage.getItem('session_id'), page: 1});
  const {data: watchListMovies, refetch: refetchWatch} = useGetListQuery({listName: 'watchlist/movies', accountID: user.id, sessionID: localStorage.getItem('session_id'), page: 1});


  useEffect(() => {
    refetchFavs();
    refetchWatch();
  }, []);



  const logout = () =>{

    localStorage.clear();

    window.location.href = "/";
  };

  return (
    <Box>
      <Box display= "flex" justifyContent="space-between">
      <Typography variant='h4' gutterBottom>My Profile</Typography>
      <Button color='inherit' onClick={logout}> Logout &nbsp; <ExitToApp/> </Button>
      </Box>
      {!favMovies?.results?.length && watchListMovies?.results?.length
      ? <Typography variant='h5'> Add Fav or watchlist some movies to see them here!</Typography>
      : <Box>
         <RatedCards title="Favourite Movies:" data={favMovies} />
         <RatedCards title="Watchlist:" data={watchListMovies} />
         </Box>
      }
    </Box>
  )
}

export default Profile;