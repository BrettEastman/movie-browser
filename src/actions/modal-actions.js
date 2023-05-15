import { fetchTrailersForMovie } from './selected-movie-actions';
export const SHOW_MODAL = 'MODAL:SHOW';
export const CLOSE_MODAL = 'MODAL:CLOSE';

export const showModal = () => {
  return (dispatch, getState) => {
    const { selectedMovie } = getState();

    dispatch(fetchTrailersForMovie(selectedMovie));
    dispatch({
      type: SHOW_MODAL,
      payload: {
        showModal: true
      }
    });
  }
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
    payload: {
      showModal: false
    }
  }
}