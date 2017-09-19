import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    FormGroup,
    FormControl,
    Button,
    ControlLabel
} from 'react-bootstrap';
import * as actions from '../actions';
import _ from 'lodash';

class CommentEdit extends Component {

  componentDidMount() {
    const { id } = this.props.match.params;
    this.handleInitialize();
  }

  handleInitialize() {
    const { id } = this.props.match.params;

    _.forEach(this.props.comments, (value,key) => {
      _.forEach(value, (value2,key2) => {
        if (value2.id == id) {
          const initData = {
            "body": value2.body
          }
          const pId = key2
          console.log(pId)
          this.props.initialize(initData)
        }
      })
    })
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

onSubmit(values){
  const { id } = this.props.match.params;
  this.props.editComment(id,values, () => {
            this.props.history.goBack();
        });
}


  render() {
    const { handleSubmit, pristine, reset, submitting, categories, post } = this.props
    return (
      <ul className='list-group col-sm-9'>
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this))}>
          <Field name="body" type="textarea" component={this.renderField} label="Body" />
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
    return { comments: state.comments}
}

export default reduxForm({
  form: 'CommentEditForm'
})(
  connect(mapStateToProps, actions)(CommentEdit)
)
