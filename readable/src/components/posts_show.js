import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getPost, votePost, fetchPostComments } from '../actions';
import {
  Row, Col, ButtonToolbar, ButtonGroup, Button, Glyphicon, Panel, Badge, Label,
  Well, Media
 } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { timestampToDate } from '../utils/helpers'
import CommentsShow from './comments_show'

class PostsShow extends Component {

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
          </Row>
          <Row>
            <Col>
              <li className="list-group-item" key={post.id}>
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
                    {_.size(this.props.comments)} Comments
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
              </li>
            </Col>
          </Row>

          <CommentsShow id={id}/>

        </div>
  }
}

function mapStateToProps(state, ownProps) {
    return {
      post: state.posts[ownProps.match.params.id],
      comments: state.comments
    }
}

export default connect(mapStateToProps, { getPost, votePost, fetchPostComments })(PostsShow)
