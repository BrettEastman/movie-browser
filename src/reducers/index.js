import { combineReducers } from 'redux';
import modalReducer from './modal-reducer';
import {
  movieTrailersReducer,
  selectedMovieReducer
} from './selected-movie-reducer';
import {
  moviesByCategory,
  selectedCategory
} from './movies-reducer';

export default combineReducers({
  moviesByCategory,
  selectedCategory,
  selectedMovie: selectedMovieReducer,
  selectedMovieTrailers: movieTrailersReducer,
  modal: modalReducer
});
