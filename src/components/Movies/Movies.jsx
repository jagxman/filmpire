import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

import { useGetMoviesQuery } from "../../services/TMDB";
import { Movielist } from "..";

const Movies = () => {
  const { data, error, isFetching } = useGetMoviesQuery();

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem"></CircularProgress>
      </Box>
    );
  }

  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          {" "}
          No movies that match that name.
          <br></br>
          Please search for something else.
        </Typography>
      </Box>
    );
  }

  if (error){
    return 'An error has occured'
  }

  return (
    <div>
      <Movielist movies={data} />
    </div>
  );
};

export default Movies;
