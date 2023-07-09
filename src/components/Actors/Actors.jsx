import React, { useState } from "react";
import { Typography, Button, Grid, Box, CircularProgress } from "@mui/material";

import { ArrowBack } from "@mui/icons-material";

import useStyles from "./styles";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  useGetActorQuery,
  useGetMoviesByActorQuery,
} from "../../services/TMDB";

import { Movielist, Pagination } from "..";

const Actors = () => {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const [page, setPage] = useState(1);

  const { data, isFetching, error } = useGetActorQuery(id);
  const { data: movieActors } = useGetMoviesByActorQuery({id, page});



  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem"></CircularProgress>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Weird. Something doesn't seem right. Go back.</Link>
      </Box>
    );
  }


  console.log(`ID: ${id}`)
  console.log(movieActors);
 // console.log(data);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            className={classes.image}
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            alt={data?.name}
          />
        </Grid>

        <Grid
          item
          lg={7}
          xl={8}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h2" gutterBottom>
            {data?.name}
          </Typography>

          <Typography variant="h5" gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>

          <Typography variant="body1" align="justify" paragraph>
            {data?.biography || "Sorry nothing here."}
          </Typography>

          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button
              variant="contained"
              color="primary"
              target="_blank"
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
            >
              IMDB
            </Button>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => history.goBack()}
              color="primary"
            >
              Go Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h2" gutterBottom align="center">
          Movies
        </Typography>

        {movieActors ? (
          <Movielist numberOfMovies={12} movies={movieActors}></Movielist>
        ) : (
          <Box>Awkward... Nothing is here. </Box>
        )}
        <Pagination currentPage={page} setPage={setPage} totalPage={movieActors?.total_pages}></Pagination>


      </Box>
    </>
  );
};

export default Actors;
