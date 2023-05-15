import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ObserverWrapper from './intersection-observer';

class ObserverElement extends Component {
  componentDidMount() {
    if (this.node && this.node instanceof HTMLElement) {
      this.observer = new ObserverWrapper(entry => {
        if (entry.isIntersecting) {
          this.props.onChange(true);
          this.observer.unobserve(this.node);
        }
      });
      this.observer.observe(this.node)
    }
  }

  componentWillUnmount() {
    this.observer.unobserve(this.node);
  }

  render() {
    return (
      <div
        className='Intersection-observer'
        ref={ node => this.node = node }
      >
        { this.props.children }
      </div>
    );
  }
}

ObserverElement.propTypes = {
  children: PropTypes.element.isRequired
}

ObserverElement.defaultProps = {
  onChange: () => {}
}

export default ObserverElement;