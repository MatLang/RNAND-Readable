import _ from 'lodash';
import { FETCH_POSTS, DELETE_POST, CREATE_POST, VOTE_POST, FETCH_POST } from '../actions';

const initialPostsState = {}

export default function(state=initialPostsState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return _.mapKeys(action.posts, 'id');
    case FETCH_POST:
        return {
            ...state,
            [action.payload.id]: action.payload
        }
    case DELETE_POST:
      return {...state,
      [action.id]: {...state[action.id],
        deleted: true }}
    case CREATE_POST:
      return {...state,
        [action.data.id]: {...action.data}}
    case VOTE_POST:
      return {...state,
      [action.post.id]: {...action.post}}
    default:
      return state;
  }
}
