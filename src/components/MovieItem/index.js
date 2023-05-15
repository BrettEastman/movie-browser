import React, { Component } from 'react';
import ImageIntersect from '../ImageIntersect';
import ObserverElement from '../IntersectionObserver';
import './styles.css';

class MovieItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isIntersecting: false,
    };
  }

  handleMovieClick = () => {
    this.props.onMovieClick(this.props.movieId);
  };

  handleOnChange = (isIntersecting) => {
    this.setState({ isIntersecting });
  };

  render() {
    // Movie item props: movieId, onMovieClick, posterPath, releaseDate, title, key
    // console.log(this.props)
    return (
      <ObserverElement onChange={this.handleOnChange}>
        <div className="movie-item" onClick={this.handleMovieClick}>
          <ImageIntersect
            alt={this.props.title}
            isIntersecting={this.state.isIntersecting}
            src={this.props.posterPath}
          />

          <div className="movie-item__content">
            <div className="movie-item__content-title">
              <h3>{this.props.title}</h3>
            </div>

            <div className="movie-item__content-description">
              <span>{this.props.releaseDate}</span>
            </div>
          </div>
        </div>
      </ObserverElement>
    );
  }
}

export default MovieItem;
