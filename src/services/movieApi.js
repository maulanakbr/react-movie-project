import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, API_KEY } from "../apis/tmdb";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getTrendingMovie: builder.query({
      query: () => `/trending/all/day?api_key=${API_KEY}`,
    }),
    getPopularMovie: builder.query({
      query: () => `/movie/popular?api_key=${API_KEY}&page=1`,
    }),
    getPopularTvShow: builder.query({
      query: () => `/tv/popular?api_key=${API_KEY}&page=1`,
    }),
    getTopRatedMovie: builder.query({
      query: () => `/movie/top_rated?api_key=${API_KEY}&page=1`,
    }),
    getTopRatedTvShow: builder.query({
      query: () => `/tv/top_rated?api_key=${API_KEY}&page=1`,
    }),
    getSearchMovie: builder.query({
      query: ({ query, page }) =>
        `/search/multi?api_key=${API_KEY}&query=${query}&page=${page}`,
    }),
    getMovieDetails: builder.query({
      query: (id) => `/movie/${id}?api_key=${API_KEY}`,
    }),
    getTvShowDetails: builder.query({
      query: (id) => `/tv/${id}?api_key=${API_KEY}`,
    }),
    getMovieCredits: builder.query({
      query: (id) => `/movie/${id}/credits?api_key=${API_KEY}`,
    }),
    getTvShowCredits: builder.query({
      query: (id) => `/tv/${id}/credits?api_key=${API_KEY}`,
    }),
    getExternalIds: builder.query({
      query: (id) => `/movie/${id}/external_ids?api_key=${API_KEY}`,
    }),
    getMovieKeywords: builder.query({
      query: (id) => `/movie/${id}/keywords?api_key=${API_KEY}`,
    }),
    getTvShowKeywords: builder.query({
      query: (id) => `/tv/${id}/keywords?api_key=${API_KEY}`,
    }),
    getKoreanMovie: builder.query({
      query: () =>
        `/discover/movie?api_key=${API_KEY}&with_original_language=ko&sort_by=popularity.desc&page=1`,
    }),
    getJapaneseMovie: builder.query({
      query: () =>
        `/discover/movie?api_key=${API_KEY}&with_original_language=ja&sort_by=popularity.desc&page=1`,
    }),
    getFiftiesMovie: builder.query({
      query: () =>
        `/discover/movie?api_key=${API_KEY}&primary_release_date.gte=1950-01-01&primary_release_date.lte=1960-01-01&sort_by=popularity.desc&page=1`,
    }),
    getSixtiesMovie: builder.query({
      query: () =>
        `/discover/movie?api_key=${API_KEY}&primary_release_date.gte=1960-01-01&primary_release_date.lte=1970-01-01&sort_by=popularity.desc&page=1`,
    }),
    getSeventiesMovie: builder.query({
      query: () =>
        `/discover/movie?api_key=${API_KEY}&primary_release_date.gte=1970-01-01&primary_release_date.lte=1980-01-01&sort_by=popularity.desc&page=1`,
    }),
    getEightiesMovie: builder.query({
      query: () =>
        `/discover/movie?api_key=${API_KEY}&primary_release_date.gte=1980-01-01&primary_release_date.lte=1990-01-01&sort_by=popularity.desc&page=1`,
    }),
    getNinetiesMovie: builder.query({
      query: () =>
        `/discover/movie?api_key=${API_KEY}&primary_release_date.gte=1990-01-01&primary_release_date.lte=2000-01-01&sort_by=popularity.desc&page=1`,
    }),
  }),
});

export const {
  useGetTrendingMovieQuery,
  useGetPopularMovieQuery,
  useGetPopularTvShowQuery,
  useGetTopRatedMovieQuery,
  useGetTopRatedTvShowQuery,
  useGetSearchMovieQuery,
  useGetMovieDetailsQuery,
  useGetTvShowDetailsQuery,
  useGetMovieCreditsQuery,
  useGetTvShowCreditsQuery,
  useGetExternalIdsQuery,
  useGetMovieKeywordsQuery,
  useGetTvShowKeywordsQuery,
  useGetKoreanMovieQuery,
  useGetJapaneseMovieQuery,
  useGetFiftiesMovieQuery,
  useGetSixtiesMovieQuery,
  useGetEightiesMovieQuery,
  useGetNinetiesMovieQuery,
} = movieApi;
