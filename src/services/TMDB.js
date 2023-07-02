import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
const page = 1;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  endpoints: (builder) => ({
    //* Get Genres

    getGenres: builder.query({
      query: () => `genre/movie/list?&api_key=${tmdbApiKey}`,
    }),

    
    //Get Movies. by [Type]
    getMovies: builder.query({
      query: ({genreIdOrCategoryName, page, searchQuery}) => {


      //Get Movies by Search
      if (searchQuery){
        return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
      }

        //popular, top_rated, upcoming -> string
      if (genreIdOrCategoryName && typeof genreIdOrCategoryName == 'string'){
        return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
      }


      console.log(genreIdOrCategoryName);

      if (genreIdOrCategoryName && typeof genreIdOrCategoryName == 'number'){
        console.log('here');
        return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;

      }

      //Popular movies
      return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      }

    }),


    getMovie: builder.query({
      query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
    })
  }),
});

export const { useGetMoviesQuery, useGetGenresQuery, useGetMovieQuery } = tmdbApi;
