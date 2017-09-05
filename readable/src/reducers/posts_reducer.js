import _ from 'lodash';
import { FETCH_POSTS, DELETE_POST } from '../actions';

const initialPostsState = {}

export default function(state=initialPostsState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return _.mapKeys(action.posts, 'id');

    default:
      return state;
  }
}
