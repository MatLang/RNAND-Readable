import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ButtonGroup,
  Button,
  DropdownButton,
  MenuItem,
  Row,
  Col
} from 'react-bootstrap';
import { sortPosts } from '../actions'

class PostsSort extends Component {

  onSelect(event) {
    this.props.sortPosts(event)
  }

  render() {
    return(
      <Row>
        <Col xs={12} className="text-xs-right">
          <ButtonGroup>
            <DropdownButton bsStyle="info" title="Sort By" id="bg-nested-dropdown">
              <MenuItem onSelect={(event) => this.onSelect(event)} eventKey="voteScore">Votescore</MenuItem>
              <MenuItem onSelect={(event) => this.onSelect(event)} eventKey="timestamp">Post Date</MenuItem>
            </DropdownButton>
          </ButtonGroup>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, { sortPosts })(PostsSort)
