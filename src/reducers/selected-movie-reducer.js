import {
  UPDATE_SELECTED_MOVIE,
  FETCH_TRAILERS_SUCCESS,
  FETCH_TRAILERS_FAILURE,
} from '../actions/selected-movie-actions';

export function selectedMovieReducer(state = null, { type, payload }) {
  switch (type) {
    case UPDATE_SELECTED_MOVIE:
      return payload.selectedMovie;
    default:
      return state;
  }
}

export function movieTrailersReducer(state = [], { type, payload }) {
  switch (type) {
    case FETCH_TRAILERS_SUCCESS:
      return payload.selectedMovieTrailers;
    case FETCH_TRAILERS_FAILURE:
      return payload.error;
    default:
      return state;
  }
}
