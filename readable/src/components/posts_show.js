import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions';

class PostsShow extends Component {

  componentWillMount() {
      const { id } = this.props.match.params;
      this.props.fetchPost(id);
  }

  render() {
    const { post } = this.props;



    return (!post)
      ? <div> Loading...</div>
      :
        <div>
          {post.title}
        </div>
  }
}

function mapStateToProps(state, ownProps) {
    return { post: state.posts[ownProps.match.params.id], posts: state.posts }
}

export default connect(mapStateToProps, {
    fetchPost
})(PostsShow);
