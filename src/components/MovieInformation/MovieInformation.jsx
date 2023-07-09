import React, { useState, useEffect } from "react";
import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  useMediaQuery,
  ListItemIcon,
  Rating,
} from "@mui/material";
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorder,
  Remove,
  ArrowBack,
  FavoriteBorderOutlined,
} from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useGetMovieQuery, useGetReccsQuery, useGetListQuery } from "../../services/TMDB";
import useStyles from "./styles";
import genreIcons from "../../assets/genres";
import { selectGenreOrCategory } from "../../features/currentGenreorCategory";
import { Movielist } from "..";
import { userSelector } from "../../features/auth";

const MovieInformation = () => {

  const { user } = useSelector(userSelector);
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const {data: favMovies} = useGetListQuery({listName: 'favorite/movies', accountID: user.id, sessionID: localStorage.getItem('session_id'), page: 1});
  const {data: watchListMovies} = useGetListQuery({listName: 'watchlist/movies', accountID: user.id, sessionID: localStorage.getItem('session_id'), page: 1});
  const { data: reccs, isFetching: isreccs } = useGetReccsQuery({
    list: "/recommendations",
    movie_id: id,
  });
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);



  const [isMovieFav, setMovieFav] = useState(false);
  const [isMovieWatched, setMovieWatched] = useState(false);


  useEffect(() => {
    setMovieFav(!!favMovies?.results?.find((movie) => movie?.id == data?.id));

  }, [favMovies, data])


  useEffect(() => {
    setMovieWatched(!!watchListMovies?.results?.find((movie) => movie?.id == data?.id))

  }, [watchListMovies, data])

  const add2Favs = async () => {
      await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
        media_type: 'movie',
        media_id: id,
        favorite: !isMovieFav, 

      });

      setMovieFav((prev) => !prev );

  };

  const add2WatchList = async () => {


    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
        media_type: 'movie',
        media_id: id,
        watchlist: !isMovieWatched, 

      });

      setMovieWatched( (prev) => !prev );




  };

  const classes = useStyles();



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

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4}>
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid>

      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data.release_date.split("-")[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>

        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data?.vote_average / 2}></Rating>
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginLeft: "10px" }}
            >
              {data?.vote_average}
            </Typography>
          </Box>

          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime}min | Language: {data?.spoken_languages[0]?.name}
          </Typography>
        </Grid>

        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre, i) => (
            <Link
              key={genre.name}
              className={classes.links}
              to="/"
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
            >
              <img
                src={genreIcons[genre.name.toLowerCase()]}
                className={classes.genreImage}
                height={30}
              ></img>

              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>

        <Typography variant="h5" gutterBottom style={{ marginTop: "10px" }}>
          Overview.
        </Typography>

        <Typography style={{ marginBottom: "2rem" }}>
          {data?.overview}
        </Typography>

        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>

        <Grid item container spacing={2}>
          {data &&
            data.credits?.cast
              ?.map(
                (character, i) =>
                  character.profile_path && (
                    <Grid
                      key={i}
                      item
                      xs={4}
                      md={2}
                      component={Link}
                      to={`/actors/${character.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        className={classes.castImage}
                        src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                        alt={character.name}
                      ></img>
                      <Typography color="textPrimary">
                        {character?.name}
                      </Typography>
                      <Typography color="textSecondary">
                        {character?.character.split("/")[0]}
                      </Typography>
                    </Grid>
                  )
              )
              .slice(0, 6)}
        </Grid>

        <Grid item container style={{ marginTop: "2rem" }}>
          <div className={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="" variant="outlined">
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
                <Button onClick={() => setOpen(true)} href="#" endIcon={<Theaters />}>
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>

            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined">
                <Button
                  onClick={add2Favs}
                  endIcon={
                    isMovieFav ? <FavoriteBorderOutlined /> : <Favorite />
                  }
                >
                  {isMovieFav ? "Unfavourite" : "favourite"}
                </Button>
                <Button
                  onClick={add2WatchList}
                  endIcon={isMovieWatched ? <Remove /> : <PlusOne/>}
                >
                  Watchlist
                </Button>
                <Button
                  endIcon={<ArrowBack />}
                  sx={{ borderColor: "primary.main" }}
                >
                  <Typography
                    component={Link}
                    style={{ textDecoration: "none" }}
                    to="/"
                    color="inherit"
                    variant="subtitle2"
                  >
                    Back{" "}
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>

      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might Enjoy these:
        </Typography>

        {reccs ? (
          <Movielist numberOfMovies={12} movies={reccs}></Movielist>
        ) : (
          <Box>Awkward... Nothing is here. </Box>
        )}
      </Box>

      <Modal
        closeAfterTransition
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results?.length > 0 ? (
    <iframe
      autoPlay
      className={classes.video}
      frameBorder="0"
      title="Trailer"
      src={`https://www.youtube.com/embed/${data?.videos?.results[0]?.key}`}
      allow="autoplay"
    />
  ) : (
    <div>No videos available.</div>
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInformation;
