import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, fetchCategories, openModal, closeModal, deletePost } from '../actions';
import { Row } from 'react-bootstrap';
import { timestampToDate } from '../utils/helpers'
import ReactModal from 'react-modal';
import PostsNewForm from './posts_new'

class PostsIndex extends Component {
  componentWillMount() {
    this.props.fetchPosts();
    this.props.fetchCategories();
  }

  renderPosts() {
    const posts = _.filter(this.props.posts, post => !post.deleted)
    return _.map(posts, post => {

      return (
        <li className="list-group-item" key={post.id}>
          <Row>{post.title}</Row>
          <Row>Posted by {post.author}</Row>
          <Row>{timestampToDate(post.timestamp)}</Row>
          <Row>{post.body}</Row>
          <Row><button className="btn btn-danger" onClick={() => this.props.deletePost(post.id)}>Delete Post</button></Row>
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
          <button type="button" className="btn btn-primary xs-right" onClick={this.props.openModal}>New Post</button>
        </div>
        <div className="row">
          <ul className="list-group col-sm-3">
            {this.renderCategories()}
          </ul>
          <ul className='list-group col-sm-9'>
            {this.renderPosts()}
          </ul>
        </div>
        <ReactModal
          isOpen={this.props.modals.modalOpen}
          onRequestClose={this.props.closeModal}
          contentLabel='Modal'
        >
        <button type="button" className="close" onClick={this.props.closeModal}>&times;</button>
          <PostsNewForm />
        </ReactModal>

      </div>
    )
  }
}

function mapStateToProps(state) {
   //const posts = _.filter(state.posts, post => !post.deleted);
  return { posts: state.posts, categories: state.categories, modals:state.modals}
}

export default connect(mapStateToProps, { fetchPosts, fetchCategories, closeModal, openModal, deletePost })(PostsIndex)
