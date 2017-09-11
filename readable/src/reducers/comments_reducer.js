import _ from 'lodash';
import { FETCH_POST_COMMENTS, VOTE_COMMENT, DELETE_COMMENT } from '../actions';

export default function(state={}, action) {
  switch(action.type){
    case FETCH_POST_COMMENTS:
      return _.mapKeys(action.payload, 'id');
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
