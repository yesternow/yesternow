import React, { Component } from "react";
import { fetchCart, removeCartItem, sendAddToCart, toggleCart } from "../store";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Image,
  List,
  Item,
  Container,
  Select,
  Button,
  Grid,
  Header,
  Divider,
  Dropdown,
  Text,
  Message
} from "semantic-ui-react";
import SingleCartItem from "./singleCartItem";

export class Cart extends Component {
  constructor() {
    super();
    this.state = {
      total: 0
    };
  }

  componentDidMount() {
    this.props.loadCart();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.time !== prevProps.time && this.props.cart.cartItems) {
      this.setState({
        total: this.props.cart.cartItems
          .map(cartItem => cartItem.quantity * cartItem.product.price)
          .reduce((a, b) => a + b, 0)
      });
    }
  }

  render() {
    let options = [];
    for (let i = 1; i <= 100; i++) {
      options.push({ text: i.toString(), value: i });
    }

    const { cartItems, user } = this.props.cart;
    if (!this.props.cart.cartItems) return <p>Cart is Empty</p>;

    return (
      <Container>
        <Grid>
          <Grid.Column>
            <Header>Shopping Cart</Header>
            <List celled>
              {cartItems.length > 0 &&
                cartItems.map(cartItem => (
                  <SingleCartItem key={cartItem.id} cartItem={cartItem} />
                ))}
              <List.Item>
                <Header>Total: ${(this.state.total / 100).toFixed(2)}</Header>
              </List.Item>
              <Button as={Link} to="/checkout" onClick={this.props.toggleCart}>
                Proceed to Checkout
              </Button>

              {!this.props.isLoggedIn && this.props.cart.cartItems.length>0 && <Message positive>
                <Message.Header>You have items in your cart!</Message.Header>
                <Link to='/signup'>
                  Sign up to save them!
                </Link>
              </Message>}
            </List>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.carts.cart,
  showCart: state.carts.showCart,
  time: new Date(),
  isLoggedIn: state.user.id
});

const mapDispatchToProps = dispatch => ({
  loadCart: () => dispatch(fetchCart()),
  toggleCart: () => dispatch(toggleCart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
