import _ from 'lodash';
import { FETCH_POST_COMMENTS, VOTE_COMMENT, DELETE_COMMENT, COUNT_POST_COMMENTS } from '../actions';

export default function(state={}, action) {
  switch(action.type){
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
    default:
      return state
  }
}

/*

comments: {
    '8xf0y6ziyjabvozdd253nd': [
      {
        id: '894tuq4ut84ut8v4t8wun89g',
        parentId: '8xf0y6ziyjabvozdd253nd',
        timestamp: 1468166872634,
        body: 'Hi there! I am a COMMENT.',
        author: 'thingtwo',
        voteScore: 6,
        deleted: false,
        parentDeleted: false
      },
      {
        id: '8tu4bsun805n8un48ve89',
        parentId: '8xf0y6ziyjabvozdd253nd',
        timestamp: 1469479767190,
        body: 'Comments. Are. Cool.',
        author: 'thingone',
        voteScore: -5,
        deleted: false,
        parentDeleted: false
      }
    ],
    '6ni6ok3ym7mf1p33lnez': []

*/
