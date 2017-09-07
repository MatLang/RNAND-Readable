import _ from 'lodash';
import { FETCH_POST_COMMENTS } from '../actions';

export default function(state={}, action) {
  switch(action.type){
    case FETCH_POST_COMMENTS:
      return _.mapKeys(action.comments, 'id');
    default:
      return state
  }
}
