import axios from 'axios';
import uuidv4 from 'uuid/v4';

const API = 'http://localhost:3001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const AUTH_HEADERS = { 'Authorization': token, 'Accept': 'application/json', };

axios.defaults.headers.common['Authorization'] = AUTH_HEADERS;

// Posts

export const FETCH_POSTS = 'FETCH_POST'
export const FETCH_CATEGORY_POSTS = 'FETCH_CATEGORY_POSTS'
export const GET_POST = 'GET_POST'
export const CREATE_POST = 'CREATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'
export const VOTE_POST = 'VOTE_POST'
export const SORT_POSTS = 'SORT_POSTS'

export function sortPosts(method) {
  return dispatch => {
    dispatch({
      type: SORT_POSTS,
      payload: method
    })
  }
}

export function fetchPosts() {
  const request = axios.get(`${API}/posts`)

  return dispatch => {
    request.then(({ data }) => {
      // dispatch POSTS
      dispatch({
        type: FETCH_POSTS,
        posts: data
      })

      // dispatch COMMENTS
      for (let post of data) {
        axios.get(`${API}/posts/${post.id}/comments`).then(({ data }) => {
          dispatch({
           type: FETCH_POST_COMMENTS,
           payload: data,
           postId: post.id,
         })
      })

    }
  });
}
}

export function fetchCategoryPosts(category){
  const request = axios.get(`${API}/${category}/posts`)

  return dispatch => {
    request.then(({ data }) => {
      dispatch({
        type: FETCH_CATEGORY_POSTS,
        posts: data
      })
    })
  }
}

export function getPost(id) {

  const request = axios.get(`${API}/posts/${id}`)

  return dispatch => {
    request.then(({data}) => {
      dispatch({
        type: GET_POST,
        data
      })
    })
  }
}

export function createPost(values) {
  const { author, title, content, category } = values;

  const data = {
    id : uuidv4(),
    timestamp : Date.now(),
    title,
    body : content,
    author,
    category
  }

  const request = axios.post(`${API}/posts`, data)

  return dispatch => {
    request.then(({ data }) => {
      dispatch({
        type: CREATE_POST,
        data
      })
    })
  }
}

export function deletePost(id) {
  const request = axios.delete(`${API}/posts/${id}`)

  return dispatch => {
    request.then((result) => {
      dispatch({
        type: DELETE_POST,
        id
      })
    })
  }
}

export function votePost(id, option) {
  const request = axios.post(`${API}/posts/${id}`, {option:option})

  return dispatch => {
    request.then(({ data }) => {
      dispatch({
        type: VOTE_POST,
        post: data
      })
    })
  }
}

export function editPost(id,values, callback) {
  const { title, body } = values;

  const data = {
    title,
    body
  }
  const request = axios.put(`${API}/posts/${id}`, data)


  return dispatch => {
    request.then(({ data }) => {
      dispatch({
        type: EDIT_POST,
        payload: data
      })
    }).then(() => callback())
  }
}

// Comments

export const FETCH_POST_COMMENTS = 'FETCH_POST_COMMENTS'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'

export function createComment(values, parentId){
  const data = {
    id: uuidv4(),
    timestamp: Date.now(),
    body: values.content,
    author: values.author,
    parentId: parentId
  }

  const request = axios.post(`${API}/comments`, data)

  return dispatch => {
    request.then(({ data }) => {
      dispatch({
        type: CREATE_COMMENT,
        payload: data
      })
    })
  }
}


export function deleteComment(id){
  const request = axios.delete(`${API}/comments/${id}`)

  return dispatch => {
    request.then(( { data }) => {
      dispatch({
        type: DELETE_COMMENT,
        payload: data
      })
    })
  }
}

export function fetchPostComments(id){
  const request = axios.get(`${API}/posts/${id}/comments`)

  return dispatch => {
    request.then(({ data }) => {
      dispatch({
        type: FETCH_POST_COMMENTS,
        postId: id,
        payload: data
      })
    })
  }
}

export function voteComment(commentId, option){
  const request = axios.post(`${API}/comments/${commentId}`, {option})

  return dispatch => {
    request.then(({ data } ) => {
      dispatch({
        type: VOTE_COMMENT,
        payload: data
      })
    })
  }
}

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

export function openModal(modal) {
  return {
    type: OPEN_MODAL,
    payload: modal
  }
}

export function closeModal(modal) {
  return {
    type: CLOSE_MODAL,
    payload: modal
  }
}
