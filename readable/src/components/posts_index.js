import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Row, Col, ButtonToolbar, ButtonGroup, Button, Glyphicon, Panel, Badge, Label, Well } from 'react-bootstrap';
import { timestampToDate } from '../utils/helpers'
import ReactModal from 'react-modal';
import PostsNewForm from './posts_new'
import { Link } from 'react-router-dom';
import CategoriesIndex from './categories_index';
import PostsSort from './posts_sort';

class PostsIndex extends Component {
  componentDidMount() {
    if(this.props.match.params.category) {
      const {
        fetchCategoryPosts,
        match: { params : { category } } } = this.props;
      fetchCategoryPosts(category);
    } else {
      this.props.fetchPosts()
    }
  }

  onDeleteClick(id) {
    this.props.deletePost(id)
    alert("Post deleted")
  }

  onVotePost(id, option) {
    this.props.votePost(id,option);
  }

    renderPosts() {

    const { posts, postsSortOrder } = this.props;

    if (posts.length === 0) {
      return <div> No posts found for this category!</div>
    }

    const sortedPosts = _.sortBy(posts, postsSortOrder).reverse()

    return _.map(sortedPosts, post => {
      return (
        <li className="list-group-item" key={post.id}>
          <Row className="text text-primary ">
            <Link to={`/${post.category}/${post.id}`}>
              {post.title}
            </Link>
            <Link to={`/edit/${post.id}`}><Glyphicon glyph="glyphicon glyphicon-edit"/></Link>
          </Row>
          <Row className="text-muted">
            Posted by {post.author}
            <Glyphicon glyph="glyphicon glyphicon glyphicon-time" />
            {timestampToDate(post.timestamp)}
          </Row>
          <Row><Label>{post.category}</Label></Row>
          <Row className="post-body">{post.body}</Row>
          <Row >
            <Col xs={10} className="text-muted">
              {(_.size(this.props.comments[post.id]))} Comments
            </Col>
            <Col xs={12} className="text-xs-right">
              <h7>
                <Label
                  className="text-xs-right"
                  bsSize="small"
                  bsStyle={post.voteScore < 0 ? "danger": "success"}>
                    {post.voteScore}
                </Label>
              </h7>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="text-xs-right">
                <ButtonGroup>
                  <Button bsSize="small" bsStyle="success" onClick={() => this.onVotePost(post.id,'upVote')}><Glyphicon  glyph="glyphicon glyphicon-thumbs-up" /></Button>
                  <Button bsSize="small" bsStyle="primary" onClick={() => this.onVotePost(post.id,'downVote')}><Glyphicon glyph="glyphicon glyphicon-thumbs-down" /></Button>
                  <Button bsSize="small" bsStyle="danger" onClick={() =>this.onDeleteClick(post.id)}>
                    <Glyphicon glyph="glyphicon glyphicon-remove" />
                  </Button>
                </ButtonGroup>
            </Col>
          </Row>
        </li>
        );
    })
  }

  render() {
    return (
      <div>
        <div className="container">
          <Row>
            <Col xs={12} className="text-xs-right">
              <Button
                bsSize="small"
                bsStyle="primary"
                onClick={() => this.props.openModal('newPost')}>
                  <Glyphicon glyph="glyphicon glyphicon-plus" />
              </Button>
            </Col>
          </Row>
          <PostsSort />
          <Row>
            <CategoriesIndex />
            <ul className='list-group col-sm-9'>
              {this.renderPosts()}
            </ul>
          </Row>
          <ReactModal
            isOpen={this.props.modals.newPost}
            onRequestClose={() => this.props.closeModal('newPost')}
            contentLabel='Modal'
          >
          <button type="button" className="close" onClick={() =>this.props.closeModal('newPost')}>&times;</button>
            <PostsNewForm />
          </ReactModal>

        </div>
      </div>
    )
  }
}

function mapStateToProps({ posts, comments, categories, postsOrder, modals }) {
  return {
    posts: _.filter(posts, post => !post.deleted),
    comments,
    categories,
    postsSortOrder: postsOrder,
    modals
  }
}

export default connect(mapStateToProps, actions)(PostsIndex)
