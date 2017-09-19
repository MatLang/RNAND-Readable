import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';

class CategoriesIndex extends Component {
  componentDidMount(){
    this.props.fetchCategories();
  }

  renderCategories() {
    const { fetchCategoryPosts } = this.props;
    return _.map(this.props.categories, category => {
      return (
        <li className="list-group-item" key={category.name}>
          <Link
            to={`/${category.path}`}
            onClick={() => fetchCategoryPosts(category.path)}
          >
            {category.name}
          </Link>
        </li>
      )
    })
  }

  render() {
    return (
      <ul className="col-sm-3">
        <li className="list-group-item" key="all">
          <Link
            to="/"
            onClick={() => this.props.fetchPosts()}
          >
            all
          </Link>
        </li>
        {this.renderCategories()}
      </ul>
    );
  }
}

function mapStateToProps({ categories }) {
  return { categories }
}

export default connect(mapStateToProps, actions)(CategoriesIndex)
