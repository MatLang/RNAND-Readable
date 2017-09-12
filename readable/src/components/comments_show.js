import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostComments, voteComment, deleteComment } from '../actions';
import {
    Button,
    ListGroup,
    ListGroupItem,
    Glyphicon,
    Label,
    Media,
    Col, Row, ButtonGroup,
} from 'react-bootstrap';
import { timestampToDate } from '../utils/helpers'

class CommentsShow extends Component {

  componentDidMount() {
    const { id } = this.props;
    this.props.fetchPostComments(id);
  }

  onVoteComment(id, option) {
    this.props.voteComment(id,option)
  }

  onDeleteClick(id) {
    this.props.deleteComment(id);
  }

  renderCommentList(){
    const { comments, id } = this.props;

    const commentsById = _.filter(comments[id], comment => !comment.deleted)

    if (!comments){
      return <div> No comments found </div>
    }

    return _.map(commentsById, (post,index) => {
      return (
        <Col key={index} sm={11} smOffset={1}>
            <Media>
              <Media.Body>
                <Media.Heading>
                  {timestampToDate(post.timestamp)} by {post.author}
                </Media.Heading>
                <p>{post.body}</p>
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
                <Col xs={12} className="text-xs-right">
                    <ButtonGroup>
                      <Button bsSize="small" bsStyle="success" onClick={() => this.onVoteComment(post.id,'upVote')}><Glyphicon  glyph="glyphicon glyphicon-thumbs-up" /></Button>
                      <Button bsSize="small" bsStyle="primary" onClick={() => this.onVoteComment(post.id,'downVote')}><Glyphicon glyph="glyphicon glyphicon-thumbs-down" /></Button>
                      <Button bsSize="small" bsStyle="danger" onClick={() => this.onDeleteClick(post.id)}>
                        <Glyphicon glyph="glyphicon glyphicon-remove" />
                      </Button>
                    </ButtonGroup>
                </Col>
              </Media.Body>
            </Media>
          </Col>
      );
    });
  }

  /*<Media>
    <Media.Body>
      <Media.Heading>{comment.title}</Media.Heading>
      <p>{comment.body}.</p>
    </Media.Body>
    <Row>
      <Col xs={12} className="text-xs-right">
          <ButtonGroup>
            <Button bsSize="small" bsStyle="success" onClick={() => this.onVotePost(comment.id,'upVote')}><Glyphicon  glyph="glyphicon glyphicon-thumbs-up" /></Button>
            <Button bsSize="small" bsStyle="primary" onClick={() => this.onVotePost(comment.id,'downVote')}><Glyphicon glyph="glyphicon glyphicon-thumbs-down" /></Button>
            <Button bsSize="small" bsStyle="danger" onClick={() =>this.onDeleteClick(comment.id)}>
              <Glyphicon glyph="glyphicon glyphicon-remove" />
            </Button>
          </ButtonGroup>
      </Col>
    </Row>
  </Media>*/

  render(){
    const { comment } = this.props;
    return(
      <ListGroup>{this.renderCommentList()}</ListGroup>
    )
  }
}

function mapStateToProps (state) {
    const comments = state.comments
    return { comments }
}

export default connect(mapStateToProps, { fetchPostComments, voteComment, deleteComment })(CommentsShow)
