import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions';

class CategoriesIndex extends Component {
  componentDidMount(){
    this.props.fetchCategories();
  }

  renderCategories() {
    return _.map(this.props.categories, category => {
      return (
        <li className="list-group-item" key={category.name}>
          {category.name}
        </li>
      )
    })
  }

  render() {
    return (
      <ul className="col-sm-3">
        {this.renderCategories()}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {categories: state.categories}
}

export default connect(mapStateToProps, { fetchCategories })(CategoriesIndex)
