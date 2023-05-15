import { CircularProgressbar } from 'react-circular-progressbar';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal } from '../../actions/modal-actions';
import RelatedList from '../RelatedList/index.js';
import 'react-circular-progressbar/dist/styles.css';
import './styles.css';

class MovieDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewState: 0,
    };

    this.filteredMovies = [];
    this.popularMovies = [];
    this.newestMovies = [];
    this.setViewState = this.setViewState.bind(this);
  }

  setViewState(viewState) {
    this.setState({ viewState });
  }

  render() {
    // MovieDetails props: onShowModal, movies, selectedMovie
    if (typeof this.props.selectedMovie === 'undefined') {
      return null;
    }

    const { viewState } = this.state;
    const movies = this.props.movies;
    const movie = this.props.selectedMovie;
    const movieFirstGenre = movie.genre_ids[0];

    this.filteredMovies = [...movies].filter((mov) => {
      let currentGenres = mov.genre_ids;
      return currentGenres.includes(movieFirstGenre) && mov !== movie;
    });

    this.popularMovies = JSON.parse(JSON.stringify(this.filteredMovies)).sort(
      (a, b) => b.popularity - a.popularity
    );

    this.newestMovies = JSON.parse(JSON.stringify(this.filteredMovies)).sort(
      (a, b) => {
        a = a.release_date.split('-').join('');
        b = b.release_date.split('-').join('');
        if (b > a) return 1;
        if (b < a) return -1;
        return 0;
      }
    );

    // console.log('this.popularMovies: ', this.popularMovies);
    // console.log('this.newestMovies: ', this.newestMovies);
    console.log('viewState: ', viewState);

    return (
      <div className="movie-details">
        <div className="movie-details__title">
          <h2>{movie.title}</h2>
        </div>

        <div className="movie-details__overview">
          <p>{movie.overview}</p>
        </div>

        <div className="movie-details__score">
          <CircularProgressbar value={movie.vote_average * 10} />
          <span> TMBD score ({movie.vote_count} reviews)</span>
        </div>

        <div className="movie-details__play" onClick={this.props.onShowModal}>
          <i className="far fa-play-circle fa-3x"></i>
          <span>Play Trailer</span>
        </div>
        <div>
          <h3 className="recommended">Recommended Movies:</h3>
          <button type="button" onClick={() => this.setViewState(1)}>
            By Popularity
          </button>
          <button type="button" onClick={() => this.setViewState(2)}>
            By Release Date
          </button>
          <div>
            {viewState === 0 && (
              <RelatedList
                filteredMovies={this.filteredMovies}
                setViewState={this.setViewState}
              />
            )}
            {viewState === 1 && (
              <RelatedList
                filteredMovies={this.popularMovies}
                setViewState={this.setViewState}
              />
            )}
            {viewState === 2 && (
              <RelatedList
                filteredMovies={this.newestMovies}
                setViewState={this.setViewState}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { selectedCategory, moviesByCategory } = state;
  const movies = moviesByCategory[selectedCategory];
  // movies = {didInvalidate: false, isFetching: false, movies: [adult, backdrop_path, etc.]}

  return {
    movies: movies.movies,
    selectedMovie: movies.movies.find((mov) => mov.id === state.selectedMovie),
  };
};

const mapActionsToProps = {
  // onUpdateSelectedMovie: updateSelectedMovie,
  onShowModal: showModal,
};

export default connect(mapStateToProps, mapActionsToProps)(MovieDetails);
