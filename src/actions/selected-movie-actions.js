import axios from 'axios';
import tmdbConfig from '../config/tmdb.json';
import tmdbApiKey from '../config/tmdbApiKey.js';

export const UPDATE_SELECTED_MOVIE         = 'SELECTED_MOVIE:UPDATE';
export const FETCH_TRAILERS_SUCCESS        = 'SELECTED_MOVIE:TRAILERS_SUCCESS';
export const FETCH_TRAILERS_FAILURE        = 'SELECTED_MOVIE:TRAILERS_FAILURE';

export const updateSelectedMovie = id => {
  return {
    type: UPDATE_SELECTED_MOVIE,
    payload: {
      selectedMovie: id
    }
  }
};

export const fetchTrailersSuccess = trailers => {
  return {
    type: FETCH_TRAILERS_SUCCESS,
    payload: {
      selectedMovieTrailers: trailers
    }
  };
};

export const fetchTrailersError = error => {
  return {
    type: FETCH_TRAILERS_FAILURE,
    payload: { error }
  };
};

export const fetchTrailersForMovie = id => {
  return dispatch => {
    axios.get(`${tmdbConfig.baseUrl}${id}/videos`, {
      params: {
        api_key: tmdbApiKey,
        language: 'en-US'
      }
    })
    .then(response => {
      dispatch(fetchTrailersSuccess(response.data.results));
      return response.data.results;
    })
    .catch(error => dispatch(fetchTrailersError(error)));
  };
};
