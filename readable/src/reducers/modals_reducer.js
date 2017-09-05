import _ from 'lodash';

import { OPEN_MODAL, CLOSE_MODAL } from '../actions';

const initialState = {
  modalOpen: true
}

export default function (state = initialState, action) {
  switch(action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        modalOpen:true
      }
    case CLOSE_MODAL:
      return {
        ...state,
        modalOpen: false
      }
    default:
      return state;
  }
}
