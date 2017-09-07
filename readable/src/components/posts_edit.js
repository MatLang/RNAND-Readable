import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import {
    FormGroup,
    FormControl,
    Button,
    ControlLabel
} from 'react-bootstrap';
import { getPost } from '../actions';

class PostsEdit extends Component {
  componentDidMount(){
    const { id } = this.props.match.params;
    this.props.getPost(id);
    this.handleInitialize();
  }

  handleInitialize() {
    if (this.props.post) {
      const initData = {
        "title": this.props.post.title,
        "body": this.props.post.body
      };
      this.props.initialize(initData);
    }
}

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = touched && error ? "warning": null;

    return (
        <FormGroup validationState={className}>
            <label>{field.label}</label>
            <FormControl
                type="text"
                {...field.input}
            />
            <div className="text-help">
                {touched ? error : ''}
            </div>
        </FormGroup>
    );
}


render () {
  const { handleSubmit, pristine, reset, submitting, categories, post } = this.props
  return (
    <ul className='list-group col-sm-9'>
      <form /*onSubmit={ handleSubmit(this.onSubmit.bind(this))}*/>
        <Field name="title" type="text" component={this.renderField} label="Title"/>
        <FormGroup>
          <ControlLabel>Author</ControlLabel>
          <FormControl.Static>{post ? post.author : ''}</FormControl.Static>
        </FormGroup>
        <Field name="body" type="textarea" component={this.renderField} label="Content" />
        <div>
          <button className="btn-primary" type="submit" disabled={submitting}>Submit</button>
          <Link to="/"><Button bsSize="small" bsStyle="danger" >Cancel</Button></Link>
        </div>
      </form>
    </ul>
  )
}
}

function mapStateToProps(state, ownProps) {
    return { post: state.posts[ownProps.match.params.id]}
}

export default reduxForm({
    //validate,
    form: 'EditPostForm'
})(
    connect(mapStateToProps, { getPost })(PostsEdit)
);
