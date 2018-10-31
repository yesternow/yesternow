import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendProductUpdate } from '../store';
import { Button, Form } from 'semantic-ui-react';

class UpdateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props.product };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.sendProductUpdate(this.state);
  }

  render() {
    const { title, description, price, quantity, weight, brand } = this.state;
    return (
      <div>
        <h3>Update Product</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Product Title</label>
            <input
              placeholder="Product Title"
              id="title"
              type="text"
              value={title}
              onChange={this.handleChange}
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Product Description</label>
            <input
              placeholder="Product Description"
              id="description"
              type="text"
              value={description}
              onChange={this.handleChange}
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Product Price</label>
            <input
              placeholder="Product Price"
              id="price"
              type="number"
              value={price}
              onChange={this.handleChange}
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Product Quantity</label>
            <input
              placeholder="Product Quantity"
              id="quantity"
              type="number"
              value={quantity}
              onChange={this.handleChange}
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Product Weight</label>
            <input
              placeholder="Product Weight in Ounces"
              id="weight"
              type="number"
              value={weight}
              onChange={this.handleChange}
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Product Brand</label>
            <input
              placeholder="Product Brand"
              id="brand"
              type="text"
              value={brand}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  sendProductUpdate: product => dispatch(sendProductUpdate(product)),
});

export default connect(null, mapDispatchToProps)(UpdateProduct);
