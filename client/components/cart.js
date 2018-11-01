import React, { Component } from 'react';
import { fetchCart } from '../store';
import { connect } from 'react-redux';
import { Item, Container } from 'semantic-ui-react'

export class Cart extends Component {
    componentDidMount(){
        this.props.loadCart()
    }
    render() {
        console.log("we are here")
        console.log(this.props.cart)
        return (
            <Container>we are single at cart page</Container>
        )
    }
}

const mapStateToProps = state => ({
    cart: state.carts.cart
})

const mapDispatchToProps = dispatch => ({
    loadCart: () => dispatch(fetchCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
