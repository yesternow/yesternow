import {connect} from 'react-redux';
import React, {Component} from 'react';
import {fetchCart} from '../store';
import {Link} from 'react-router-dom';
import {Image, List, Item, Container, Select, Button, Grid, Header, Divider, Dropdown, Text} from 'semantic-ui-react';
import {SingleCartItem, TakeMoney} from './index';

class Checkout extends Component {
	constructor() {
		super();
		this.state = {
			total: 0
		};
	}
	componentDidMount() {
		this.props.loadCart();
	}
	render() {
		let options = [];
		for (let i = 1; i <= 100; i++) {
			options.push({text: i.toString(), value: i});
		}

		const {cartItems, user} = this.props.cart;
		if (!this.props.cart.cartItems) return <p>Cart is Empty</p>;

		return (
			// <Container>
			<Grid>
				<Grid.Column>
					<Header>Shopping Cart</Header>
					<List celled>
						{cartItems.length &&
							cartItems.map((cartItem) => <SingleCartItem key={cartItem.id} cartItem={cartItem} />)}
						<List.Item>
							<Header>Total: {this.state.total}</Header>
						</List.Item>
						{/* <Button as={Link} to="/stripe">
								Place your order
              </Button> */}
						<TakeMoney />
					</List>
				</Grid.Column>
			</Grid>
			// </Container>
		);
	}
}
const mapStateToProps = (state) => ({
	cart: state.carts.cart,
	order: state.order
});

const mapDispatchToProps = (dispatch) => ({
	loadCart: () => dispatch(fetchCart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
