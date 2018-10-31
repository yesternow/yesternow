import React, { Component } from 'react';
import { fetchProducts, setVisibility, setSort, fetchCategories } from '../store';
import { connect } from 'react-redux';



class Products extends Component {
  constructor(){
    super()
    this.state = {
      visibilityFilter: 'all'
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.loadProducts();
    this.props.loadCategories()
  }

  handleChange(event)  {
    console.log("event changed", event.target.value)
    this.props.setVisibility(event.target.value)
  }
  render() {

    if (!this.props.products) {
      return <div>Hello there are no products yet</div>;
    }
      return (
        <div>
          <select onChange={this.handleChange}>
            <option value='all'>All</option>
            {this.props.categories && this.props.categories.map(category=><option key={category.id} value={category.id}>{category.name}</option>)}
          </select>
          {this.props.products.map(product => (
            <div key={product.id}>
              <h2>{product.title}</h2>
              <p>{product.price}</p>
            </div>
          ))}
          {!this.props.products.length && <p>No products under this category</p>}
        </div>
      );


  }
}
const mapStateToProps = state => ({
  products: state.product.products
  .filter(product => product.isActive)
  .filter(product => {
    if(state.product.visibilityFilter === 'all'){
      return true
    }
    else {
      const filtered = product.categories.filter(category => category.id === Number(state.product.visibilityFilter))
      if(filtered.length) return true
      return false
    }
  }),
  categories: state.product.categories
});

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(fetchProducts()),
  loadCategories: () => dispatch(fetchCategories()),
  setVisibility: (visibility) => dispatch(setVisibility(visibility)),
  setSort: (sort) => dispatch(setSort(sort))
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
