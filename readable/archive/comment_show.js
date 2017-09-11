import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Media, Col, Row, Button, ButtonGroup, Glyphicon
} from 'react-bootstrap';

class CommentShow extends Component {
  render() {
    return(
      <Media>
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
      </Media>
    )
  }
}
