import React, { Component } from 'react';

import './styles.css';

class MenuButton extends Component {
  render() {
    const { handleMenuButtonClick, displayText, isSelected } = this.props;
    return (
      <div
        className={
          isSelected ? 'menu-button selected' : 'menu-button'
        }
        onClick={handleMenuButtonClick}
      >
        <span>{displayText}</span>
      </div>
    );
  }
}

export default MenuButton;
