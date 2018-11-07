import {connect} from 'react-redux';
import React, {Component, Fragment} from 'react';
import {fetchCart, createNewOrder, addAddress} from '../store';
import {Link} from 'react-router-dom';
import {Image, List, Item, Container, Select, Button, Grid, Header, Divider, Dropdown, Text} from 'semantic-ui-react';
import {SingleCartItem, TakeMoney} from './index';
import AddressForm from './AddressForm';
import { AddressSelector, GuestForm } from './';

class Checkout extends Component {
	constructor() {
		super();
		this.state = {
			total: 0
		};
		this.handleToggle = this.handleToggle.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleToggle (event) {
        this.setState({
            addAddressToggle: !this.state.addAddressToggle
        })
	}

	async handleSubmit (event) {
		event.preventDefault()
		const lineItems = this.props.cart.cartItems.map(cartItem => ({quantity: cartItem.quantity, price: cartItem.product.price, productId: cartItem.product.id}))
		if(this.props.isLoggedIn){
			this.props.createNewOrder({userId: this.props.cart.userId, addressId: this.props.selectedAddress, cartId: this.props.cart.id, lineItems})
		} else{
			const {
				address1,
				address2,
				city,
				state,
				country,
				zipcode,
				guestEmail,
				guestNumber
			  } = this.props.guestInfo
			await this.props.addAddress({address1,
				address2,
				city,
				state,
				country,
				zipcode})
			this.props.createNewOrder({ addressId: this.props.addressId, cartId: this.props.cart.id, lineItems, guestEmail, guestNumber})
		}


	}

	componentDidMount() {
		this.props.loadCart();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.time !== prevProps.time && this.props.cart.cartItems) {
			this.setState({
				total: (this.props.cart.cartItems
					.map((cartItem) => cartItem.quantity * cartItem.product.price)
					.reduce((a, b) => a + b, 0)/100).toFixed(2)
			});
		}
	}

	render() {
		let options = [];
		for (let i = 1; i <= 100; i++) {
			options.push({text: i.toString(), value: i});
		}

		const {cartItems, user} = this.props.cart;
		if (!this.props.cart.cartItems) return <p>Cart is Empty</p>;

		return (

			<Grid>
				<Grid.Column>
					<Header>Shopping Cart</Header>
					<List celled>
						{cartItems.length &&
							cartItems.map((cartItem) => <SingleCartItem key={cartItem.id} cartItem={cartItem} />)}
						<List.Item>
							<Header>Total: ${this.state.total}</Header>
						</List.Item>
			  {this.props.isLoggedIn ?
			  	<Fragment>
				<AddressSelector />
				<Button onClick={this.handleToggle}>Add Address</Button>
				{this.state.addAddressToggle && <AddressForm />}
				</Fragment>
			  :

			  <Fragment>
				  <GuestForm />

			  </Fragment>

			}

						<Button onClick={this.handleSubmit}>Checkout</Button>
					</List>
				</Grid.Column>
			</Grid>

		);
	}
}
const mapStateToProps = (state) => ({
	cart: state.carts.cart,
	order: state.order,
	time: new Date(),
	address: state.address.addresses,
	selectedAddress: state.address.selectedAddress,
	isLoggedIn: !!state.user.id,
	guestInfo: state.guestInfo,
	addressId: state.guestInfo.addressId
});

const mapDispatchToProps = (dispatch) => ({
	loadCart: () => dispatch(fetchCart()),
	createNewOrder: order => dispatch(createNewOrder(order)),
	addAddress: address => dispatch(addAddress(address))
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
