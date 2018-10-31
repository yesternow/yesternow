import React, { Component } from 'react';
import { fetchProducts } from '../store';
import { connect } from 'react-redux';

class Products extends Component {
  componentDidMount() {
    this.props.loadProducts();
  }
  render() {
    if (!this.props.products) {
      return <div>Hello there are no products yet</div>;
    }
    return (
      <div>
        {this.props.products.map(product => (
          <div key={product.id}>
            <h2>{product.title}</h2>
          </div>
        ))}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  products: state.products,
  //once fetching is implemented... state.products.products
  //joseph
});

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(fetchProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
