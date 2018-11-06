import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeCartItem, sendAddToCart } from '../store';
import { List, Dropdown, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export class SingleCartItem extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.setState({
      quantity: this.props.cartItem.quantity,
    });
  }

  handleChange(event, data) {
    this.setState({
      quantity: data.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.sendAddToCart(
      {
        quantity: this.state.quantity - this.props.cartItem.quantity,
        productId: this.props.cartItem.productId,
        cartId: this.props.cartId,
      },
      true
    );
  }

  render() {
    let options = [];
    for (let i = 1; i <= 100; i++) {
      options.push({ text: i.toString(), value: i });
    }
    const cartItem = this.props.cartItem;
    return (
      <List.Item>
        {/* <Image avatar src={cartItem.product.images[0].imageUrl} /> */}
        <List.Content>
          <List.Header as={Link} to={`/products/${cartItem.product.id}`}>
            {cartItem.product.title}
          </List.Header>
          <List.Description>Price: {cartItem.product.price} </List.Description>
          <List.Description>
            Quantity:{' '}
            <Dropdown
              search
              placeholder={cartItem.quantity.toString()}
              selection
              compact
              options={options}
              onChange={this.handleChange}
            />
          </List.Description>
        </List.Content>
        <List.Content floated="right">
          <Button onClick={this.handleSubmit}>Update</Button>
          <Button onClick={() => this.props.removeItem(cartItem.id)}>
            Remove
          </Button>
        </List.Content>
      </List.Item>
    );
  }
}

const mapStateToProps = state => ({
  cartId: state.carts.cart.id,
});

const mapDispatchToProps = dispatch => ({
  removeItem: cartItemId => dispatch(removeCartItem(cartItemId)),
  sendAddToCart: (product, isUpdate) =>
    dispatch(sendAddToCart(product, isUpdate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleCartItem);

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import {Link } from 'react-router-dom'
// import { fetchCart } from '../store';
// import { Image, List, Item, Container, Select, Button, Grid, Header, Divider, Dropdown, Text } from 'semantic-ui-react'
// import SingleCartItem from './'

// export class Cart extends Component {

//     componentWillMount(){
//         this.props.loadCart()
//     }

//     render() {

//         const {cartItems, user  } = this.props.cart;
//         if (!this.props.cart.cartItems) return <p>Cart is Empty</p>

//         return (
//             <Container>
//             <Grid>
//                 <Grid.Column>
//                 <Header>Shopping Cart</Header>
//                 <List celled>
//                 {cartItems.map(cartItem => <SingleCartItem key={cartItem.id} cartItem={cartItem} />
//                 )}
//                     <List.Item>
//                         <Header>Total: </Header>
//                     </List.Item>
//                     <Button>Checkout</Button>
//                 </List>
//                 </Grid.Column>
//             </Grid>
//             </Container>
//         )
//     }
// }

// const mapStateToProps = state => ({
//     cart: state.carts.cart,
//     showCart: state.carts.showCart

// })

// const mapDispatchToProps = dispatch => ({
//     loadCart: () => dispatch(fetchCart())
// })

// export default connect(mapStateToProps, mapDispatchToProps)(Cart)
