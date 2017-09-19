import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {
    FormGroup,
    FormControl,
    Button
} from 'react-bootstrap';

function validate(values) {
    const errors = {};

    !values.title ? errors.title = "Enter a title!" : ""
    !values.author ? errors.author = "Enter a name!" : ""
    !values.content ? errors.content = "Enter some content!" : ""
    !values.category ? errors.category = "Select a category!" : ""

    return errors;
}

class PostsNew extends Component {

  componentWillMount(){
    this.props.fetchCategories();
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

  renderCategoryFields(field) {
      const { categories } = this.props;
      const { meta: { touched, error } } = field;
      const className = touched && error ? "warning": null;

      return (
          <FormGroup validationState={className}>
              <label>{field.label}</label>
              <select {...field.input} className="form-control">
                  <option value="" className="disabled">-- Select Category</option>
                  {_.map(categories, category => (
                      <option
                          key={category.name}
                          value={category.name}
                      >
                          {category.name}
                      </option>
                  ))}
              </select>
              <div className="text-help">
                  {field.meta.touched ? field.meta.error : ''}
              </div>
          </FormGroup>
      );
  }

  onSubmit(values){
  this.props.createPost(values);
  this.props.closeModal('newPost');
}

  render () {
    const { handleSubmit, pristine, reset, submitting, categories } = this.props
    return (
      <form onSubmit={ handleSubmit(this.onSubmit.bind(this))}>
        <Field name="title" type="text" component={this.renderField} label="Title"/>
        <Field name="author" type="text" component={this.renderField} label="Owner"/>
        <Field name="category" label="Category:" component={this.renderCategoryFields.bind(this)} />
        <Field name="content" type="textarea" component={this.renderField} label="Content" />
        <div>
          <button className="btn-primary" type="submit" disabled={submitting}>Submit</button>
          <button className="btn-danger" type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
        </div>
      </form>
    )
  }
}

function mapStateToProps({ categories }) {
  return { categories }
}

export default reduxForm({
  form: 'PostsNewForm',  // a unique identifier for this form
  validate,                // <--- validation function given to redux-form
})(
  connect(mapStateToProps, actions)(PostsNew)
);
