import { combineReducers } from 'redux';
import PostsReducer from './posts_reducer';
import CategoriesReducer from './categories_reducer';
import ModalsReducer from './modals_reducer';
import CommentsReducer from './comments_reducer';
import PostsSortReducer from './sort_reducer';
import LoadingReducer from './loading';
import { reducer as reduxFormReducer } from 'redux-form';

const rootReducer = combineReducers({
  posts: PostsReducer,
  postsOrder:  PostsSortReducer,
  categories: CategoriesReducer,
  comments: CommentsReducer,
  modals: ModalsReducer,
  form: reduxFormReducer,
  loadingPosts: LoadingReducer
});

export default rootReducer;
