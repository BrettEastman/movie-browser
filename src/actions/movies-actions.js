import axios from 'axios';
import tmdbConfig from '../config/tmdb.json';
import tmdbApiKey from '../config/tmdbApiKey.js';

export const FETCH_MOVIES_BEGIN = 'FETCH_MOVIES:BEGIN';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES:SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES:FAILURE';
export const INVALIDATE_CATEGORY = 'INVALIDATE_CATEGORY';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';

export const selectCategory = (category) => {
  return {
    type: SELECT_CATEGORY,
    category,
  };
};

export const invalidateCategory = (category) => {
  return {
    type: INVALIDATE_CATEGORY,
    category,
  };
};

const fetchMoviesBegin = (category) => {
  return {
    type: FETCH_MOVIES_BEGIN,
    category,
  };
};

const fetchMoviesSuccess = (category, movies) => {
  return {
    type: FETCH_MOVIES_SUCCESS,
    category,
    movies,
  };
};

const fetchMoviesFailure = (error) => {
  return {
    type: FETCH_MOVIES_FAILURE,
    error,
  };
};

export const fetchMovies = (category) => {
  return (dispatch) => {
    dispatch(fetchMoviesBegin(category));
    return axios
      .get(`${tmdbConfig.baseUrl}${category}`, {
        params: {
          api_key: tmdbApiKey,
          language: 'en-US',
          page: 1,
        },
      })
      .then((response) => {
        dispatch(fetchMoviesSuccess(category, response.data.results));
      })
      .catch((error) => dispatch(fetchMoviesFailure(error)));
  };
};

const shouldFetchMovies = (state, category) => {
  const moviesByCategory = state.moviesByCategory[category];

  if (moviesByCategory.movies.length < 1) {
    return true;
  } else if (moviesByCategory.isFetching) {
    return false;
  } else {
    return moviesByCategory.didInvalidate;
  }
};

export function fetchMoviesIfNeeded(category) {
  return (dispatch, getState) => {
    // const shouldFetch = shouldFetchMovies(getState(), category); // why const shouldFetch?

    return shouldFetchMovies(getState(), category)
      ? dispatch(fetchMovies(category))
      : Promise.resolve();
  };
}
