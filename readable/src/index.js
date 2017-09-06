import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root_reducer';
import PostsIndex from './components/posts_index';
import PostsShow from './components/posts_show';


const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

//console.log(store.getState())

ReactDOM.render(
  <Provider store={store}>
    <Router>
        <Switch>
          <Route exact path="/" component={PostsIndex} />
          <Route path="/posts/:id" component={PostsShow} />
        </Switch>
    </Router>
  </Provider>,
   document.querySelector('.container'));
