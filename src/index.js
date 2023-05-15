import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { fetchMovies } from './actions/movies-actions';

const allStoreEnhancers = compose(
  applyMiddleware(thunk)
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(
  reducer,
  {
    // this is the STATE (default state - replaced every time there is an update)
    selectedMovie: null,
    selectedCategory: 'now_playing',
    moviesByCategory: {
      now_playing: {
        isFetching: false,
        movies: [],
        didInvalidate: false,
      },
      upcoming: {
        isFetching: false,
        movies: [],
        didInvalidate: false,
      },
    },
    modal: { showModal: false },
  },
  allStoreEnhancers
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
  () => fetchMovies('now_playing')(store.dispatch)
);
registerServiceWorker();
