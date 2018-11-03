import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendProductUpdate } from '../store';
import { Button, Form, Container } from 'semantic-ui-react';
import underscore from 'underscore'

class UpdateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      price: '',
      quantity: '',
      weight: '',
      brand: '',
      imageUrl: '',
      dimensions: '',
      isActive: false,
      categories: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadProduct(this.props.match.params.id);
    this.setState(underscore.pick(this.props.product, ['title', 'description', price, quantity, weight, brand, dimensions, isActive, categories]))

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
      <Container>
        <h3>Update Product</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <div>
              <label>Product Title</label>
              <input
                placeholder="Product Title"
                id="title"
                type="text"
                value={title}
                onChange={this.handleChange}
                required
              />
            </div>
          </Form.Field>
          <Form.Field>
            <div>
              <label>Product Description</label>
              <input
                placeholder="Product Description"
                id="description"
                type="text"
                value={description}
                onChange={this.handleChange}
                required
              />
            </div>
          </Form.Field>
          <Form.Field>
            <div>
              <label>Product Price</label>
              <input
                placeholder="Product Price"
                id="price"
                type="number"
                value={price}
                onChange={this.handleChange}
                required
              />
            </div>
          </Form.Field>
          <Form.Field>
            <div>
              <label>Product Quantity</label>
              <input
                placeholder="Product Quantity"
                id="quantity"
                type="number"
                value={quantity}
                onChange={this.handleChange}
                required
              />
            </div>
          </Form.Field>
          <Form.Field>
            <div>
              <label>Product Weight</label>
              <input
                placeholder="Product Weight in Ounces"
                id="weight"
                type="number"
                value={weight}
                onChange={this.handleChange}
                required
              />
            </div>
          </Form.Field>
          <Form.Field>
            <div>
              <label>Product Brand</label>
              <input
                placeholder="Product Brand"
                id="brand"
                type="text"
                value={brand}
                onChange={this.handleChange}
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

const mapStateToProps = state => ({
  product: state.product.product
})

const mapDispatchToProps = dispatch => ({
  sendProductUpdate: product => dispatch(sendProductUpdate(product)),
  loadProduct: productId => dispatch(fetchProduct(productId)),
});

export default connect(null, mapDispatchToProps)(UpdateProduct);
