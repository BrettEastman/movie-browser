import React, { Component } from 'react';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import MoviesMenu from './components/MoviesMenu';
import TrailerModal from './components/TrailerModal';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MoviesMenu />
        <MovieList />
        <MovieDetails />
        <TrailerModal />
      </div>
    );
  }
}

export default App;
