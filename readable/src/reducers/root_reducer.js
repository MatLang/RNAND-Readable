import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';
import PostsReducer from './posts_reducer';
import CategoriesReducer from './categories_reducer';
import ModalsReducer from './modals_reducer';
import { reducer as reduxFormReducer } from 'redux-form';

const rootReducer = combineReducers({
  posts: PostsReducer,
  categories: CategoriesReducer,
  modals: ModalsReducer,
  form: reduxFormReducer
});

export default rootReducer;
