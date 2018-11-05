import React, { Component } from 'react';
import {
  fetchProducts,
  setVisibility,
  setSort,
  fetchCategories,
  sendAddToCart,
} from '../store';
import { connect } from 'react-redux';
import {
  Container,
  Dropdown,
  Input,
  Card,
  Divider,
  Image,
  Grid,
  Button,
  Icon,
  Select,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Products extends Component {
  constructor() {
    super();
    this.state = {
      visibilityFilter: 'all',
    };
    this.handleChange = this.handleChange.bind(this);
    // this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.loadProducts();
    this.props.loadCategories();
  }

  handleChange(event) {
    console.log('event changed', event.target.value);
    this.props.setVisibility(event.target.value);
  }

  // handleClick(productId) {
  //   this.props.sendAddToCart(productId)
  // }
  render() {
    if (!this.props.products || !this.props.categories.length) {
      return <div>Hello there are no products yet</div>;
    }

    return (
      <Container>
        <Link to='/updateproduct/1'>update</Link>
        <Grid>
          <Grid.Row>
            <select onChange={this.handleChange}>
              <option value="all">All</option>
              {this.props.categories &&
                this.props.categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </Grid.Row>
          <Grid.Row>
            <Card.Group itemsPerRow={4}>
              {this.props.products.map(product => (
                <Card key={product.title}>
                  <Image
                    as={Link}
                    to={`/products/${product.id}`}
                    src={product.images.length && product.images[0].imageUrl}
                  />
                  <Card.Content>
                    <Card.Header>{product.title}</Card.Header>
                    <Card.Description>{product.price}</Card.Description>
                  </Card.Content>
                  <Button
                    animated="vertical"
                    color="orange"
                    onClick={() =>
                      this.props.sendAddToCart({
                        quantity: 1,
                        productId: product.id,
                        cartId: 1,
                      })
                    }
                  >
                    <Button.Content hidden>Add To Cart</Button.Content>
                    <Button.Content visible>
                      <Icon name="shop" />
                    </Button.Content>
                  </Button>
                </Card>
              ))}
            </Card.Group>
          </Grid.Row>
          {!this.props.products.length && (
            <p>No products under this category</p>
          )}
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  products: state.product.products
    .filter(product => product.isActive)
    .filter(product => {
      if (state.product.visibilityFilter === 'all') {
        return true;
      } else {
        const filtered = product.categories.filter(
          category => category.id === Number(state.product.visibilityFilter)
        );
        if (filtered.length) return true;
        return false;
      }
    }),
  categories: state.product.categories,
});

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(fetchProducts()),
  loadCategories: () => dispatch(fetchCategories()),
  setVisibility: visibility => dispatch(setVisibility(visibility)),
  setSort: sort => dispatch(setSort(sort)),
  sendAddToCart: productId => dispatch(sendAddToCart(productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
