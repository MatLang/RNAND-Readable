import _ from 'lodash';

import { OPEN_MODAL, CLOSE_MODAL } from '../actions';

const initialState = {
  newPost: false,
  newComment: false
}

export default function (state = initialState, action) {
  switch(action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        [action.payload]:true
      }
    case CLOSE_MODAL:
      return {
        ...state,
        [action.payload]: false
      }
    default:
      return state;
  }
}
