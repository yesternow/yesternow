import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendProductUpdate, fetchProduct } from '../store';
import { Button, Form, Container, Radio } from 'semantic-ui-react';
import underscore from 'underscore'

class UpdateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
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
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    this.props.loadProduct(this.props.match.params.productId);
  }

  componentDidUpdate(prevProps){
    if(prevProps.product.id !== this.props.product.id){
      const { id, title, description, price, quantity, weight, brand, imageUrl,
        dimensions, isActive,
        categories } = this.props.product;
        this.setState({id, title, description, price, quantity, weight, brand, imageUrl,
          dimensions,
          categories, isActive})
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleToggle() {
    this.setState({
      isActive: !this.state.isActive
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.sendProductUpdate(this.state)
  }

  render() {
    const { title, description, price, quantity, weight, brand, imageUrl,
      dimensions,
      categories } = this.state;
    return (
      <Container>
        <h3>Update Product</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field required>

              <label>Product Title</label>
              <input
                name="title"
                type="text"
                value={title}
                onChange={this.handleChange}
              />

          </Form.Field>
          <Form.Field required>

              <label>Product Description</label>
              <input
                name="description"
                type="text"
                value={description}
                onChange={this.handleChange}

              />

          </Form.Field>
          <Form.Group widths='equal'>
            <Form.Field required>

                <label>Product Price</label>
                <input
                  name="price"
                  type="number"
                  value={price}
                  onChange={this.handleChange}

                />

            </Form.Field>
            <Form.Field required>

                <label>Product Quantity</label>
                <input
                  name="quantity"
                  type="number"
                  value={quantity}
                  onChange={this.handleChange}

                />

            </Form.Field>
            <Form.Field required>

                <label>Product Weight</label>
                <input
                  id="weight"
                  type="number"
                  value={weight}
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
                id="brand"
                type="text"
                value={brand}
                onChange={this.handleChange}
              />

          </Form.Field>
          <Form.Group>
            <label>Is Active</label>
            <Radio toggle active={this.state.isActive} onClick={this.handleToggle} />
          </Form.Group>

            <Button type="submit">Submit</Button>

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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct);
