import _ from 'lodash';
import { SORT_POSTS } from '../actions';

const initialState = 'voteScore';

export default function(state=initialState, action) {
  switch(action.type) {
    case SORT_POSTS:
      return action.payload
    default:
      return state
  }
}
