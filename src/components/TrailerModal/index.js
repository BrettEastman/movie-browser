import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal-actions';
import './styles.css';

class TrailerModal extends Component {
  renderYoutubeTrailer() {
    if (this.props.selectedMovieTrailers.length > 0
      && this.props.selectedMovieTrailers[0].site === 'YouTube'
    ) {
      return (
        <iframe
          width="854"
          height="480"
          src={`https://www.youtube.com/embed/${this.props.selectedMovieTrailers[0].key}?&autoplay=1&mute=1`}>
        </iframe>
      )
    }
  }

  render() {
    if (!this.props.showModal) {
      return null;
    }

    return (
      <div className="modal">
        <div className="modal-container">
          <div className="modal-container__trailer">
            { this.renderYoutubeTrailer() }
          </div>

          <div
            className="modal-container__exit"
            onClick={ this.props.onCloseModal }
          >
            <i className="fas fa-times-circle fa-2x"></i>
            <span> CLOSE</span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  showModal: state.modal.showModal,
  selectedMovieTrailers: state.selectedMovieTrailers
});

const mapActionsToProps = {
  onCloseModal: closeModal
}
export default connect(
  mapStateToProps,
  mapActionsToProps
)(TrailerModal);
