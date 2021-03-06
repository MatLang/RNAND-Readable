import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
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
import { Link } from 'react-router-dom';

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
                <p>
                  {post.body}
                  <span>
                    <Link style={{"marginLeft":"5px"}}
                    to={`/comments/edit/${post.id}`}>
                      <Glyphicon glyph="glyphicon glyphicon-edit"/>
                    </Link>
                  </span>
                </p>

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

  render(){
    const { comment } = this.props;
    return(
      <ListGroup>{this.renderCommentList()}</ListGroup>
    )
  }
}

function mapStateToProps ({ comments }) {
    return { comments }
}

export default connect(mapStateToProps, actions)(CommentsShow)
