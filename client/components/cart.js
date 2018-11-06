import React, { Component } from 'react';
import { fetchCart, removeCartItem, sendAddToCart } from '../store';
import { connect } from 'react-redux';
import {Link } from 'react-router-dom'
import { Image, List, Item, Container, Select, Button, Grid, Header, Divider, Dropdown, Text } from 'semantic-ui-react'
import SingleCartItem from './singleCartItem'

export class Cart extends Component {

    constructor(){
        super()
        this.state = {
            total: 0
        }
    }


    componentDidMount(){
        this.props.loadCart()

    }
    componentDidUpdate(prevProps, prevState){
        if(this.props.time !== prevProps.time && this.props.cart.cartItems){
            this.setState({
                total: this.props.cart.cartItems.map(cartItem=>cartItem.quantity*cartItem.product.price).reduce((a,b)=>a+b)
            })
        }

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
                {cartItems.length && cartItems.map(cartItem => <SingleCartItem key={cartItem.id} cartItem={cartItem} />)}
                    <List.Item>
                        <Header>Total: {this.state.total}</Header>
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
    showCart: state.carts.showCart,
    time: new Date()
})

const mapDispatchToProps = dispatch => ({
    loadCart: () => dispatch(fetchCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
