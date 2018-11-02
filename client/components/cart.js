import React, { Component } from 'react';
import { fetchCart } from '../store';
import { connect } from 'react-redux';
import {Link } from 'react-router-dom'
import { Image, List, Item, Container, Select, Button, Grid, Header, Divider } from 'semantic-ui-react'

export class Cart extends Component {
    componentWillMount(){
        this.props.loadCart()

    }

    render() {
        const {cartItems, user  } = this.props.cart;
        if (!this.props.cart.cartItems) return <p>Loading...</p>

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
                            <List.Description>Price: {cartItem.product.price} Quantity: {cartItem.quantity}</List.Description>
                        </List.Content>
                        <List.Content floated="right">
                        <Button>Remove</Button>
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
    loadCart: () => dispatch(fetchCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
