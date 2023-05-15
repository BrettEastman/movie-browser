import React, { Component } from 'react';
import './styles.css';

class ImageIntersect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false
    };
  }

  handleOnLoad = () => {
    this.setState({ isLoaded: true })
  }

  render() {
    const imageClass = this.props.isIntersecting
      ? 'Image-intersect--show'
      : 'Image-intersect';

    return (
      <div className={ imageClass }>
        <img
          onLoad={ this.handleOnLoad }
          src={ this.props.isIntersecting ? this.props.src : null }
        />
      </div>
    );
  }
}

export default ImageIntersect;