import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions';

class PostsShow extends Component {

  componentDidMount() {
      const { id } = this.props.match.params;
      this.props.fetchPost(id);
  }

  render() {
    const { post } = this.props;

    return (
      <div>
        { post.title }
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
    return { post: state.posts[ownProps.match.params.id] }
}

export default connect(mapStateToProps, {
    fetchPost
})(PostsShow);
