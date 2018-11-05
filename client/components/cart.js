import React, { Component } from 'react';
import { fetchCart, removeCartItem, sendAddToCart } from '../store';
import { connect } from 'react-redux';
import {Link } from 'react-router-dom'
import { Image, List, Item, Container, Select, Button, Grid, Header, Divider, Dropdown, Text } from 'semantic-ui-react'

export class Cart extends Component {


    componentWillMount(){
        this.props.loadCart()
    }

    render() {

        let options = []
        for(let i = 1; i <= 100; i++) {
            options.push({text: i.toString(), value: i})
        }

        const {cartItems, user  } = this.props.cart;
        if (!this.props.cart.cartItems) return <p>Cart is Empty</p>

        return (
            <Container>
            <Grid>
                <Grid.Column>
                <Header>Shopping Cart</Header>
                <List celled>
                {cartItems.map(cartItem =>(
                    <List.Item key={cartItem.id}>
                        <Image avatar src={cartItem.product.images[0].imageUrl}/>
                    <List.Content>
                            <List.Header as ={Link} to={`/products/${cartItem.product.id}`}>{cartItem.product.title}</List.Header>
                            <List.Description>Price: {cartItem.product.price} </List.Description>
                            <List.Description>Quantity:                             <Dropdown
                                search
                                placeholder={cartItem.quantity.toString()}
                                selection
                                compact
                                options={options}
                            />

                            </List.Description>
                        </List.Content>
                        <List.Content floated="right">
                            <Button onClick={() => this.props.sendAddToCart({quantity:1})} >Update</Button>
                        <Button onClick={() => this.props.removeItem(cartItem.id)}>Remove</Button>
                        </List.Content>
                    </List.Item>))}
                    <List.Item>
                        <Header>Total: </Header>
                    </List.Item>
                    <Button>Checkout</Button>
                </List>
                </Grid.Column>
            </Grid>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    cart: state.carts.cart,
    showCart: state.carts.showCart

})

const mapDispatchToProps = dispatch => ({
    loadCart: () => dispatch(fetchCart()),
    removeItem: cartItemId => dispatch(removeCartItem(cartItemId)),
    sendAddToCart: (product) => dispatch(sendAddToCart(product))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
