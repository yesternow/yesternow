import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts, deleteProduct, sendProductUpdate } from '../store';
import { Container, Grid, List, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class AllProductsAdmin extends Component {
  componentDidMount() {
    this.props.loadProducts();
  }
  render() {
    if (!this.props.products) {
      return <h3>No products</h3>;
    }
    return (
      <Container>
        <Grid>
          <Grid.Column>
            <List celled>
              <h3>All Products</h3>
              {this.props.products.map(product => (
                <List.Item key={product.id}>
                  <List.Header>{product.title}</List.Header>
                  <List.Description>
                    {'Quantity: ' +
                      product.quantity +
                      ' isAvailable: ' +
                      product.isAvailable}
                  </List.Description>
                  <List.Content floated="right">
                    <Button as={Link} to={`/updateproduct/${product.id}`}>
                      Edit
                    </Button>
                    <Button
                      onClick={() =>
                        this.props.updateProduct({
                          id: product.id,
                          isAvailable: !product.isAvailable,
                        })
                      }
                    >
                      Toggle Available
                    </Button>
                    <Button
                      onClick={() => this.props.removeProduct(product.id)}
                    >
                      Remove
                    </Button>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  products: state.product.products,
});

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(fetchProducts()),
  removeProduct: productId => dispatch(deleteProduct(productId)),
  updateProduct: product => dispatch(sendProductUpdate(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProductsAdmin);
