import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {
  Row, Col, ButtonToolbar, ButtonGroup, Button, Glyphicon, Panel, Badge, Label,
  Well, Media
 } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { timestampToDate } from '../utils/helpers';
import CommentsShow from './comments_show';
import NewPost from './comment_new';
import ReactModal from 'react-modal';

class PostsShow extends Component {

  componentWillMount() {
    return <div> Test </div>
  }

  componentDidMount() {
      const { id } = this.props.match.params;
      this.props.getPost(id);
      this.props.fetchPostComments(id);
  }

  onVotePost(id, option) {
    this.props.votePost(id,option);
  }

  render() {
    const { post } = this.props;
    const { id } = this.props.match.params;

    return (!post)
      ? <div>Loading</div>
      :
        <div>
          <Row>
            <Col>
              <Link to="/"><Button bsStyle="primary" >Home</Button></Link>
            </Col>
            <Col className="text-xs-right">
              <Button
                bsSize="small"
                bsStyle="primary"
                onClick={() => this.props.openModal('newComment')}>
                  <Glyphicon glyph="glyphicon glyphicon-plus" />
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="list-group-item" key={post.id}>
                <Row className="text text-primary ">
                  <Link to={`/posts/${post.id}`}>
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
                  <Col xs={2} className="text-xs-right">
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
              </div>
            </Col>
          </Row>
          <ReactModal
            isOpen={this.props.modals.newComment}
            onRequestClose={() => this.props.closeModal('newComment')}
            contentLabel='Modal'
          >
            <NewPost parentId={post.id}/>
          </ReactModal>

            <CommentsShow id={id}/>

        </div>
  }
}

function mapStateToProps({ posts, comments, modals }, ownProps) {
    return {
      post: posts[ownProps.match.params.id],
      comments,
      modals
    }
}

export default connect(mapStateToProps, actions)(PostsShow)
