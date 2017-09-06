import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, fetchCategories, openModal, closeModal, deletePost, votePost } from '../actions';
import { Row, ButtonToolbar, ButtonGroup, Button, Glyphicon, Panel, Badge, Label, Well } from 'react-bootstrap';
import { timestampToDate } from '../utils/helpers'
import ReactModal from 'react-modal';
import PostsNewForm from './posts_new'

class PostsIndex extends Component {
  componentWillMount() {
    this.props.fetchPosts();
    this.props.fetchCategories();
  }

  onDeleteClick(id) {
    this.props.deletePost(id)
  }

  onVotePost(id, option) {
    this.props.votePost(id,option);
  }

    renderPosts() {

    const { posts } = this.props;

    if (posts.length === 0) {
      return <div> No posts found for this category!</div>
    }

    const sortedPosts = _.sortBy(posts, 'voteScore').reverse()


    return _.map(sortedPosts, post => {

      return (
        <li className="list-group-item" key={post.id}>
          <Row className="text text-primary "><h4>{post.title}</h4></Row>
          <Row className="text-muted">
            Posted by {post.author}
            <Glyphicon glyph="glyphicon glyphicon glyphicon-time" />
            {timestampToDate(post.timestamp)}
          </Row>
          <Row><Label>{post.category}</Label></Row>
          <Row className="post-body">{post.body}</Row>
          <Row >
            <h7>
              <Label className="pull-right" bsSize="small" bsStyle={post.voteScore < 0 ? "danger": "success"}>{post.voteScore}
              </Label>
            </h7>
          </Row>
          <Row>
            <ButtonToolbar className="pull-right">
              <ButtonGroup>
                <Button bsSize="small" bsStyle="success" onClick={() => this.onVotePost(post.id,'upVote')}><Glyphicon  glyph="glyphicon glyphicon-thumbs-up" /></Button>
                <Button bsSize="small" bsStyle="primary" onClick={() => this.onVotePost(post.id,'downVote')}><Glyphicon glyph="glyphicon glyphicon-thumbs-down" /></Button>
                <Button bsSize="small" bsStyle="danger" onClick={() =>this.onDeleteClick(post.id)}>
                  <Glyphicon glyph="glyphicon glyphicon-remove" />
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
          </Row>
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

          <Button className="pull-right" bsSize="small" bsStyle="primary" onClick={this.props.openModal}><Glyphicon glyph="glyphicon glyphicon-plus" /></Button>
        </div>
        <div className="row">
          <ul className="col-sm-3">
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
  return { posts: _.filter(state.posts, post => !post.deleted), categories: state.categories, modals:state.modals}
}

export default connect(mapStateToProps, { fetchPosts, fetchCategories, closeModal, openModal, deletePost, votePost })(PostsIndex)
