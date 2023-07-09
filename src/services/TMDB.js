import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
const page = 1;

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  endpoints: (builder) => ({
    //* Get Genres

    getGenres: builder.query({
      query: () => `genre/movie/list?&api_key=${tmdbApiKey}`,
    }),

    getList: builder.query({
      query: ({listName, accountID, sessionID, page}) => `/account/${accountID}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionID}&page=${page}`,
    }),

    //Get Movies. by [Type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        //Get Movies by Search
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
        }

        //popular, top_rated, upcoming -> string
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName == "string") {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }

        console.log(genreIdOrCategoryName);

        if (genreIdOrCategoryName && typeof genreIdOrCategoryName == "number") {
          console.log("here");
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
        }

        //Popular movies
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),

    getMovie: builder.query({
      query: (id) =>
        `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
    }),

    getReccs: builder.query({
      query: ( {movie_id, list} ) =>
        `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`,

    }),

    getActor: builder.query({
      query: (actor_id) =>
      `/person/${actor_id}?api_key=${tmdbApiKey}`,
    }),

    getMoviesByActor: builder.query({
      query: ({id, page}) =>
        `/discover/movie?page=${page}&with_cast=${id}&api_key=${tmdbApiKey}`,
    }),

  }),
});

export const {useGetActorQuery, useGetMoviesQuery, useGetGenresQuery, useGetMovieQuery, useGetReccsQuery, useGetMoviesByActorQuery, useGetListQuery} =
  tmdbApi;
