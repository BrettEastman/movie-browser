import React, { Component } from 'react';
import config from '../../config/tmdb.json';
import MovieItem from '../MovieItem';
import './styles.css';

import { connect } from 'react-redux';
import { fetchMoviesIfNeeded } from '../../actions/movies-actions';
import { updateSelectedMovie } from '../../actions/selected-movie-actions';

class MovieList extends Component {
  handleSelectedMovieClick = (id) => {
    this.props.onUpdateSelectedMovie(id);
  };

  renderMovies() {
    const { selectedCategory, movies } = this.props;

    if (movies.length <= 0) {
      return null;
    }

    return movies.map((movie, idx) => {
      const posterPath = `${config.poster}${movie.poster_path}`;

      return (
        <MovieItem
          key={`${movie.title}-${idx}`}
          movieId={movie.id}
          onMovieClick={this.handleSelectedMovieClick}
          posterPath={posterPath}
          releaseDate={movie.release_date}
          title={movie.title}
        />
      );
    });
  }

  render() {
    // console.log('MovieList props: ', this.props)
    return <div className="movie-list">{this.renderMovies()}</div>;
  }
}

const mapStateToProps = (state) => {
  const { selectedCategory, moviesByCategory } = state;
  const { isFetching, movies } = moviesByCategory[selectedCategory] || {
    isFetching: true,
    movies: [],
  };

  return {
    isFetching,
    movies,
    selectedCategory,
  };
};

const mapActionsToProps = {
  onUpdateSelectedMovie: updateSelectedMovie,
  onFetchMoviesIfNeeded: fetchMoviesIfNeeded,
};

export default connect(mapStateToProps, mapActionsToProps)(MovieList);
