import axios from 'axios';
import uuidv4 from 'uuid/v4';

const API = 'http://localhost:5001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const AUTH_HEADERS = { 'Authorization': token, 'Accept': 'application/json', };

axios.defaults.headers.common['Authorization'] = AUTH_HEADERS;

// Posts

export const FETCH_POSTS = 'FETCH_POST'
export const FETCH_POST = 'FETCH_POST'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'
export const VOTE_POST = 'VOTE_POST'

export function fetchPosts() {
  const request = axios.get(`${API}/posts`)

  return dispatch => {
    request.then(({ data }) => {
      dispatch({
        type: FETCH_POSTS,
        posts: data
      })
    })
  };
}

export function addPost( { title, body, owner, category }) {
  const data = {
    id: uuidv4(),
    timestamp: Date.now(),
    title,
    body,
    owner,
    category
  }

  const request = axios.post(`${API}/posts`, data)

  return dispatch => {
    request.then(
      dispatch({
        type: ADD_POST
      })
    )
  }
}

// Comments

export const GET_COMMENTS_FOR_POST = 'GET_COMMENTS_FOR_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'

// Categories

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const FETCH_CATEGORY = 'FETCH_CATEGORY'

export function fetchCategories() {
  const request = axios.get(`${API}/categories`)

  return dispatch => {
    request.then(({ data }) => {
      dispatch({
        type: FETCH_CATEGORIES,
        categories: data.categories
      })
    })
  };
}

// Modals

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export function openModal() {
  return {
    type: OPEN_MODAL,
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  }
}
