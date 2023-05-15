import React, { Component } from 'react';
import RelatedItem from '../RelatedItem';
import './styles.css';

import { connect } from 'react-redux';
import { fetchMoviesIfNeeded } from '../../actions/movies-actions';
import { updateSelectedMovie } from '../../actions/selected-movie-actions';

class RelatedList extends Component {
  handleSelectedMovieClick = (id) => {
    this.props.onUpdateSelectedMovie(id);
  };

  renderMovies() {
    const { movies, filteredMovies, setViewState } = this.props;

    if (movies.length <= 0) {
      return null;
    }

    return filteredMovies.map((movie, idx) => {
      return (
        <RelatedItem
          key={`${movie.title}-${idx}`}
          movieId={movie.id}
          onMovieClick={this.handleSelectedMovieClick}
          releaseDate={movie.release_date}
          title={movie.title}
          setViewState={setViewState}
        />
      );
    });
  }

  render() {
    // console.log('RelatedList props: ', this.props);
    // RelatedList props: isFetching, movies, onFetchMoviesIfNeeded, onUpdateSelectedMovie, filteredMovies, selectedCategory, selectedMovie

    return <div className="related-list">{this.renderMovies()}</div>;
  }
}

const mapStateToProps = (state) => {
  const { selectedCategory, moviesByCategory, selectedMovie } = state;
  const { isFetching, movies } = moviesByCategory[selectedCategory] || {
    isFetching: true,
    movies: [],
  };

  return {
    isFetching,
    movies,
    selectedCategory,
    selectedMovie,
  };
};

const mapActionsToProps = {
  onUpdateSelectedMovie: updateSelectedMovie,
  onFetchMoviesIfNeeded: fetchMoviesIfNeeded,
};

export default connect(mapStateToProps, mapActionsToProps)(RelatedList);
