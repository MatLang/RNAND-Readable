import _ from 'lodash';
import { FETCH_POST_COMMENTS, VOTE_COMMENT, DELETE_COMMENT, COUNT_POST_COMMENTS } from '../actions';

export default function(state={}, action) {
  switch(action.type){
    case FETCH_POST_COMMENTS:
      return { ...state, [action.postId]: action.payload }
    case VOTE_COMMENT:
      return {
        ...state,
        [action.payload.id]: action.payload
      }
    case DELETE_COMMENT:
      return {
        ...state,
        [action.payload.id]: action.payload,
        deleted: true
      }
    default:
      return state
  }
}
