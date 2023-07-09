import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography
} from "@mui/material";
import { useSelector } from "react-redux";

import { useGetMoviesQuery } from "../../services/TMDB";
import { Movielist, Pagination } from "..";
import { selectGenreOrCategory } from "../../features/currentGenreorCategory";

const Movies = () => {

  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);

  const { data, error, isFetching } = useGetMoviesQuery({genreIdOrCategoryName, page, searchQuery});
  const lg = useMediaQuery((theme) => theme.breakpoints.only("lg"));
  const numberOfMovies = lg ? 16 : 18;

 


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
      <Movielist movies={data} numberOfMovies={numberOfMovies} />
      <Pagination currentPage={page} setPage={setPage} totalPage = {data.total_pages}></Pagination>
    </div>
  );
};

export default Movies;
