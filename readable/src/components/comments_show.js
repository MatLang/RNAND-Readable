import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostComments } from '../actions';
import {
    Button,
    ListGroup,
    ListGroupItem,
    Glyphicon,
    Label
} from 'react-bootstrap';
import { timestampToDate } from '../utils/helpers'

class CommentsShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPostComments(id);
  }

  renderCommentList(){
    const { comments } = this.props;

    if (!comments){
      return <div> No comments found </div>
    }

    return _.map(comments, (post,id) => {
      return (
            <ListGroupItem
                header={post.title}
                key={id}
            >
                <div>{timestampToDate(post.timestamp)} by {post.author}</div>
                <div>{post.body}</div>
                <div>{post.category}</div>
                <Button bsSize="small" bsStyle="success">
                    <Glyphicon  glyph="glyphicon glyphicon-thumbs-up" />
                </Button>
                <Button bsSize="small" bsStyle="primary">
                  <Glyphicon glyph="glyphicon glyphicon-thumbs-down" />
                </Button>
                <Button bsSize="small" bsStyle="danger">
                  <Glyphicon glyph="glyphicon glyphicon-remove" />
                </Button>
                <h7>
                  <Label className="pull-right" bsSize="small" bsStyle={post.voteScore < 0 ? "danger": "success"}>{post.voteScore}
                  </Label>
                </h7>
            </ListGroupItem>
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

function mapStateToProps (state) {
    const comments = _.filter(state.comments, comment => !comment.deleted);
    return { comments }
}

export default connect(mapStateToProps, { fetchPostComments })(CommentsShow)
