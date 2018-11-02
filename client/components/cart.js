import React, { Component } from 'react';
import { fetchCart } from '../store';
import { connect } from 'react-redux';
import {Link } from 'react-router-dom'
import { Image, List, Item, Container, Select, Button } from 'semantic-ui-react'

export class Cart extends Component {
    componentWillMount(){
        this.props.loadCart()

    }
    render() {
        // if(!this.props.showCart) {return <p></p>}
        // if(!this.props.cart || !Object.keys(this.props.cart).length || !this.props.cart.cartItems.length){return <p>Empty Cart</p>}
        const {cartItems, user  } = this.props.cart;
        console.log('cart', this.props.cart)
        if (!this.props.cart.cartItems) return <p>Loading...</p>

        return (
            <Container>
                <List celled>
                {cartItems && cartItems.map(cartItem => <List.Item key={cartItem.id}>
                <Image  size="small" src={cartItem.product.images[0].imageUrl}/>
                <List.Content>
                    <List.Header as ={Link} to={`/products/${cartItem.product.id}`}>{cartItem.product.title}</List.Header>
                    <List.Description>Price: {cartItem.product.price} Quantity: {cartItem.quantity}</List.Description>
                </List.Content>

                <Button>Remove </Button>

                </List.Item>)}
                </List>
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
