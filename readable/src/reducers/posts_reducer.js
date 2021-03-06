import _ from 'lodash';
import {
  FETCH_POSTS, DELETE_POST, CREATE_POST, VOTE_POST, GET_POST,
  FETCH_CATEGORY_POSTS, EDIT_POST, FETCH_POST_COMMENTS } from '../actions/types';

const initialPostsState = {}

export default function(state=initialPostsState, action) {
  switch (action.type) {
    case GET_POST:
      return { ...state,
         [action.data.id]: {...action.data} };
    case FETCH_POSTS:
      return {...state,
        ..._.mapKeys(action.posts, 'id')};
    case FETCH_CATEGORY_POSTS:
      return _.mapKeys(action.posts, 'id');
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
    case EDIT_POST:
    return {
        ...state,
        [action.payload.id]: action.payload
    }
    default:
      return state;
  }
}
