import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions';

class PostsShow extends Component {

  componentDidMount(){
    //const { id } = this.props.match.params;
    this.props.fetchPost('8xf0y6ziyjabvozdd253nd');

  }

  render() {
    const { post } = this.props;

    return (
      <div>
        {post.id}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { post : state.posts['8xf0y6ziyjabvozdd253nd'] };
}

export default connect(mapStateToProps, { fetchPost })(PostsShow)
