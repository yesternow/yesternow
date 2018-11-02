import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProduct } from '../store';
import { Button, Form, Container } from 'semantic-ui-react';
import history from '../history'
class AddProduct extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const title = event.target.title.value;
    const description = event.target.description.value;
    const price = Number(event.target.price.value);
    const quantity = Number(event.target.quantity.value);
    const weight = Number(event.target.weight.value);
    const brand = event.target.brand.value;
    const imageUrl = event.target.imageUrl.value;

    this.props.addProduct({
      title,
      description,
      price,
      quantity,
      weight,
      brand,
    }).then(response => history.push(`/products/${response.product.id}`))
    }

  render() {
    return (
      <Container>
        <h3>Add New Product</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <div>
              <label>Product Title</label>
              <input
                placeholder="Product Title"
                id="title"
                type="text"
                required
              />
            </div>
          </Form.Field>
          <Form.Field>
            <div>
              <label>Product Description</label>
              <input
                placeholder="Product Description"
                name="description"
                type="text"
                required
              />
            </div>
          </Form.Field>
          <Form.Field>
            <div>
              <label>Product Price</label>
              <input
                placeholder="Product Price"
                name="price"
                type="number"
                required
              />
            </div>
          </Form.Field>
          <Form.Field>
            <div>
              <label>Product Quantity</label>
              <input
                placeholder="Product Quantity"
                name="quantity"
                type="number"
                required
              />
            </div>
          </Form.Field>
          <Form.Field>
            <div>
              <label>Product Weight</label>
              <input
                placeholder="Product Weight in Ounces"
                name="weight"
                type="number"
                required
              />
            </div>
          </Form.Field>
          <Form.Field>
            <div>
              <label>Product Brand</label>
              <input placeholder="Product Brand" name="brand" type="text" />
            </div>
          </Form.Field>
          <Form.Field>
            <div>
              <label>Product Image</label>
              <input
                placeholder="Image Url"
                name="imageUrl"
                type="url"
              />
            </div>
          </Form.Field>
          <div>
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addProduct: product => dispatch(addProduct(product)),
});

export default connect(null, mapDispatchToProps)(AddProduct);
