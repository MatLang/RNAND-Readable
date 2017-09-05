import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, fetchCategories } from '../actions';
import { Row } from 'react-bootstrap';
import { timestampToDate } from '../utils/helpers'

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchCategories();
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item" key={post.id}>
          <Row>{post.title}</Row>
          <Row>Posted by {post.author}</Row>
          <Row>{timestampToDate(post.timestamp)}</Row>
          <Row>{post.body}</Row>
        </li>
        );
    })
  }

  renderCategories() {
    return _.map(this.props.categories, category => {
      return (
        <li className="list-group-item" key={category.name}>
          {category.name}
        </li>
      )
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <ul className="list-group col-sm-3">
            {this.renderCategories()}
          </ul>
          <ul className='list-group col-sm-9'>
            {this.renderPosts()}
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { posts: state.posts, categories: state.categories}
}

export default connect(mapStateToProps, { fetchPosts, fetchCategories })(PostsIndex)
