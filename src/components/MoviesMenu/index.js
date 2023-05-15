import React, { Component } from 'react';
import MenuButton from '../MenuButton';
import './styles.css';

import { connect } from 'react-redux';
import {
  fetchMoviesIfNeeded,
  selectCategory,
} from '../../actions/movies-actions';

const CATEGORY_NOW_PLAYING = 'now_playing';
const CATEGORY_UPCOMING = 'upcoming';

class MoviesMenu extends Component {
  handleNowPlayingButtonClick = () => {
    this.props.onFetchMoviesIfNeeded(CATEGORY_NOW_PLAYING);
    this.props.onSelectCategory(CATEGORY_NOW_PLAYING);
  };

  handleUpcomingButtonClick = () => {
    this.props.onFetchMoviesIfNeeded(CATEGORY_UPCOMING);
    this.props.onSelectCategory(CATEGORY_UPCOMING);
  };

  render() {
    // console.log(this.props);
    return (
      <div className="movies-menu">
        <div className="movies-menu__buttons">
          <MenuButton
            isSelected={this.props.selectedCategory === CATEGORY_NOW_PLAYING}
            displayText="Now Playing"
            handleMenuButtonClick={this.handleNowPlayingButtonClick}
          />
        </div>
        <div>
          <MenuButton
            isSelected={this.props.selectedCategory === CATEGORY_UPCOMING}
            displayText="Upcoming"
            handleMenuButtonClick={this.handleUpcomingButtonClick}
          />
        </div>
      </div>
    );
  }
}

// props that are state
const mapStateToProps = (state) => ({
  showModal: state.modal.showModal,
  selectedMovieTrailers: state.selectedMovieTrailers,
  selectedCategory: state.selectedCategory,
});

// props that are functions
const mapActionsToProps = {
  onFetchMoviesIfNeeded: fetchMoviesIfNeeded,
  onSelectCategory: selectCategory,
};

export default connect(mapStateToProps, mapActionsToProps)(MoviesMenu);
