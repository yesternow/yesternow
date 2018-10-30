import React from 'react';
import { connect } from 'react-redux';

const Products = props => {
  if (!props.products) {
    return <div>Hello there are no products yet</div>;
  }
  return (
    <div>
      {props.products.map(product => (
        <div key={product.id}>
          <h2>{product.title}</h2>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  products: state.products,
  //will need to be state.products.products after seed data
});

export default connect(mapStateToProps)(Products);
