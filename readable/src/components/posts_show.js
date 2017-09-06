import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPost } from '../actions';

class PostsShow extends Component {

  componentDidMount() {
      const { id } = this.props.match.params;
      this.props.getPost(id);
  }

  render() {
    const { post } = this.props;

    return (!post)
      ? <div>Loading</div>
      :
        <div>
          {post.title}
        </div>
  }
}

function mapStateToProps(state, ownProps) {
    return { post: state.posts[ownProps.match.params.id]}
}

export default connect(mapStateToProps, { getPost })(PostsShow)
