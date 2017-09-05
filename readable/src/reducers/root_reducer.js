import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';
import PostsReducer from './posts_reducer';
import CategoriesReducer from './categories_reducer';

const rootReducer = combineReducers({
  posts: PostsReducer,
  categories: CategoriesReducer
});

export default rootReducer;
