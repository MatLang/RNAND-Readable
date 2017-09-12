import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import { createComment, closeModal } from '../actions'
import { connect } from 'react-redux';
import {
    FormGroup,
    FormControl,
    Button
} from 'react-bootstrap';

class NewComment extends Component {

  onSubmit(values) {
    const { parentId } = this.props;
    this.props.createComment(values, parentId);
    this.props.closeModal('newComment');
  }

  renderField(field) {
    return (
        <FormGroup>
            <label>{field.label}</label>
            <FormControl
                type="text"
                {...field.input}
            />
        </FormGroup>
    );
}

  render() {
    const { handleSubmit, submitting, pristine, reset } = this.props;
    return (
      <form onSubmit={ handleSubmit(this.onSubmit.bind(this))}>
        <Field name="author" type="text" component={this.renderField} label="Owner"/>
        <Field name="content" type="textarea" component={this.renderField} label="Content" />
        <div>
          <button className="btn-primary" type="submit" disabled={submitting}>Submit</button>
          <button className="btn-danger" type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'CommentsNewForm',  // a unique identifier for this form
})(
  connect(null, { createComment, closeModal })(NewComment)
);
