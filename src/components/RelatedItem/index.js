import React, { Component } from 'react';
import './styles.css';

class RelatedItem extends Component {
  constructor(props) {
    super(props);
  }

  handleMovieClick = () => {
    this.props.onMovieClick(this.props.movieId);
  };

  render() {
    // Related item props: movieId, onMovieClick, releaseDate, title, key

    const { setViewState } = this.props;

    // console.log('RelatedItem props: ', this.props);
    return (
      <div className="related-item" onClick={this.handleMovieClick}>
        <div className="related-item__content" onClick={() => setViewState(0)}>
          <div>
            <div>{this.props.title}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default RelatedItem;
