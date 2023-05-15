import {
  SELECT_CATEGORY,
  FETCH_MOVIES_BEGIN,
  INVALIDATE_CATEGORY,
  FETCH_MOVIES_SUCCESS,
} from '../actions/movies-actions';

export function selectedCategory(state = 'upcoming', action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.category;
    default:
      return state;
  }
}

function movies(
  state = {
    isFetching: false,
    didInvalidate: false,
    movies: [],
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_CATEGORY:
      return {
        ...state,
        didInvalidate: true,
      };
    case FETCH_MOVIES_BEGIN:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      };
    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        movies: action.movies,
      };
    default:
      return state;
  }
}

export function moviesByCategory(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_CATEGORY:
    case FETCH_MOVIES_BEGIN:
    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        [action.category]: movies(state[action.category], action),
      };
    default:
      return state;
  }
}
