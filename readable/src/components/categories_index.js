import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories, fetchCategoryPosts } from '../actions';
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
        {this.renderCategories()}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {categories: state.categories}
}

export default connect(mapStateToProps, { fetchCategories, fetchCategoryPosts })(CategoriesIndex)
