import _ from 'lodash';
import { FETCH_POST_COMMENTS, VOTE_COMMENT, DELETE_COMMENT, COUNT_POST_COMMENTS,
   CREATE_COMMENT, GET_COMMENT, EDIT_COMMENT
 } from '../actions';

export default function(state={}, action) {
  switch(action.type){
    case CREATE_COMMENT:
      return {
        ...state,
        [action.payload.parentId]: {...state[action.payload.parentId],
        [action.payload.id]: {...action.payload}}
      }
    case FETCH_POST_COMMENTS:
      return { ...state, [action.postId]: _.mapKeys(action.payload, 'id') }
    case VOTE_COMMENT:
      return {
        ...state,
        [action.payload.parentId]: {...state[action.payload.parentId],
        [action.payload.id]: {...action.payload}}
      }
    case DELETE_COMMENT:
      return {
        ...state,
        [action.payload.parentId]: {...state[action.payload.parentId],
        [action.payload.id]: {...action.payload, deleted:true}}
      }
    case GET_COMMENT:
      return {
        ...state,
        [action.payload.parentId]: {...state[action.payload.parentId],
        [action.payload.id]: {...action.payload}}
      }
    case EDIT_COMMENT:
      return {
        ...state,
        [action.payload.parentId]: {...state[action.payload.parentId],
        [action.payload.id]: {...action.payload}}
      }
    default:
      return state
  }
}
