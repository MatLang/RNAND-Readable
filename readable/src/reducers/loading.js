import _ from 'lodash';
import { LOADING_POSTS } from '../actions/types';

const initialState = {
  loadingPosts: false
}

export default function(state=initialState, action) {
  switch(action.type){
    case LOADING_POSTS:
      return {
        ...state,
        loadingPosts: action.payload
      }
    default:
      return state
    }
  }
