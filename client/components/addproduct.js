import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProduct } from '../store';

class AddProduct extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();

    const title = event.target.title.value;
    const description = event.target.description.value;
    const price = event.target.price.value;
    const quantity = event.target.quantity.value;
    const weight = event.target.weight.value;
    const brand = event.target.brand.value;

    this.props.addProduct({
      title,
      description,
      price,
      quantity,
      weight,
      brand,
    });
  }

  render() {
    return (
      <div>
        <h3>Add A New Product</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              placeholder="Product Title"
              id="title"
              type="text"
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <input
              placeholder="Product Description"
              id="description"
              type="text"
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <input
              placeholder="Product Price"
              id="price"
              type="number"
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <input
              placeholder="Product Quantity"
              id="quantity"
              type="number"
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <input
              placeholder="Product Weight in Ounces"
              id="weight"
              type="number"
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <input
              placeholder="Product Brand"
              id="brand"
              type="text"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addProduct: product => dispatch(addProduct(product)),
});

export default connect(null, mapDispatchToProps)(AddProduct);
