import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProduct } from '../store';
import { Button, Form, Container, Grid, Header } from 'semantic-ui-react';
import history from '../history';
class AddProduct extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      price: '',
      quantity: '',
      weight: '',
      brand: '',
      imageUrl: '',
      dimensions: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props
      .addProduct(this.state)
      .then(action => history.push(`/products/${action.product.id}`));

    this.setState({
      title: '',
      description: '',
      price: '',
      quantity: '',
      weight: '',
      brand: '',
      imageUrl: '',
      dimensions: '',
    });
  }

  render() {
    const {
      title,
      description,
      price,
      quantity,
      weight,
      brand,
      imageUrl,
      dimensions,
    } = this.state;

    return (
      <Container>
        <Header as="h3">Add New Product</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field required>
            <label>Product Title</label>
            <input
              placeholder="Product Title"
              name="title"
              value={title}
              type="text"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field required>
            <label>Product Description</label>
            <input
              placeholder="Product Description"
              name="description"
              value={description}
              type="text"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Field required>
              <label>Product Price</label>
              <input
                placeholder="Product Price"
                name="price"
                min="0"
                value={price}
                type="number"
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field required>
              <label>Product Quantity</label>
              <input
                placeholder="Product Quantity"
                name="quantity"
                min="0"
                value={quantity}
                type="number"
                onChange={this.handleChange}
                required
              />
            </Form.Field>
            <Form.Field required>
              <label>Product Weight</label>
              <input
                placeholder="Product Weight in Ounces"
                name="weight"
                value={weight}
                min="0"
                type="number"
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Product Dimensions</label>
              <input
                placeholder="Product Dimensions"
                name="dimensions"
                value={dimensions}
                type="text"
                onChange={this.handleChange}
              />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <label>Product Brand</label>
            <input
              placeholder="Product Brand"
              name="brand"
              type="text"
              onChange={this.handleChange}
              value={brand}
            />
          </Form.Field>
          <Form.Field>
            <label>Product Image</label>
            <input
              placeholder="Image Url"
              name="imageUrl"
              value={imageUrl}
              type="url"
              onChange={this.handleChange}
            />
          </Form.Field>
          {/* <Form.Group>
            <label>Is Active</label>
            <Form.Radio
              label="Yes"
              name="isActive"
              value={isActive}
              checked={isActive === true}
              onChange={this.handleChange}
            />
            <Form.Radio
              label="No"
              name="isActive"
              value={isActive}
              checked={isActive === false}
              onChange={this.handleChange}
            />
          </Form.Group> */}
          {/* <Form.Group>
            <label>Is Available</label>
            <Form.Radio
              label="Yes"
              value={isAvailable}
              checked={isAvailable === true}
              onChange={this.handleChange}
            />
            <Form.Radio
              label="No"
              name="isAvailable"
              value={isAvailable}
              checked={isAvailable === false}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <label>Is Featured</label>
            <Form.Radio
              label="Yes"
              name="isFeatured"
              value={isFeatured}
              checked={isFeatured === true}
              onChange={this.handleChange}
            />
            <Form.Radio
              label="No"
              name="isAvailable"
              value={isFeatured}
              checked={isFeatured === false}
              onChange={this.handleChange}
            />
          </Form.Group> */}
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addProduct: product => dispatch(addProduct(product)),
});

export default connect(null, mapDispatchToProps)(AddProduct);
