import {
  SHOW_MODAL,
  CLOSE_MODAL
} from '../actions/modal-actions';

function modalReducer(state = false, { type, payload }) {
  switch (type) {
    case SHOW_MODAL:
      return payload;
    case CLOSE_MODAL:
      return payload;
    default:
      return state;
  }
}

export default modalReducer;
