import React, { Component } from 'react';
import { fetchCarts } from '../store';
import { connect } from 'react-redux';
import { Item, Container } from 'semantic-ui-react'

class Carts extends Component {
    componentDidMount(){
        this.props.loadCarts()
    }
    render () {
        const carts = this.props.carts
        if(!this.props.carts) return <p>Loading...</p>
        return (
            <Container>
                <Item.Group>
                {carts.map(cart => {
                    return (
                    <Item>
                        <Item.Content>
                            <Item.Header>{cart.id}</Item.Header>
                            <Item.Description>{cart.user.firstName} {cart.user.lastName}</Item.Description>
                            <Item.Meta>Items</Item.Meta>

                        </Item.Content>
                    </Item>
                    )
                })}

                </Item.Group>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    carts: state.carts.carts
})

const mapDispatchToProps = dispatch => ({
    loadCarts: () => dispatch(fetchCarts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Carts)
