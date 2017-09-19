import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {
  BrowserRouter,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root_reducer';
import PostsIndex from './components/posts_index';
import PostsShow from './components/posts_show';
import CommentsShow from './components/comments_show';
import PostsEdit from './components/posts_edit';
import CommentEdit from './components/comment_edit';
import NotFound from './components/not_found';
import { Grid } from 'react-bootstrap';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Grid>
          <Switch>
            <Route path="/posts/:id/comments" component={CommentsShow} />
            <Route path="/:category/:id" component={PostsShow} />
            <Route path="/edit/:id" component={PostsEdit} />
            <Route path="/comments/edit/:id" component={CommentEdit} />
            <Route path="/:category" component={PostsIndex} />
            <Route exact path="/" component={PostsIndex} />
            <Route component={NotFound} />
          </Switch>
        </Grid>
      </div>
    </BrowserRouter>
  </Provider>,
   document.querySelector('.container'));
