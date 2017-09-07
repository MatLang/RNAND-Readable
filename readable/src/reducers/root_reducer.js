import { combineReducers } from 'redux';
import PostsReducer from './posts_reducer';
import CategoriesReducer from './categories_reducer';
import ModalsReducer from './modals_reducer';
import CommentsReducer from './comments_reducer';
import { reducer as reduxFormReducer } from 'redux-form';

const rootReducer = combineReducers({
  posts: PostsReducer,
  categories: CategoriesReducer,
  comments: CommentsReducer,
  modals: ModalsReducer,
  form: reduxFormReducer
});

export default rootReducer;
