import React, {Component} from 'react';
import {Button, Header, Icon, Image, Menu, Segment, Sidebar, Ref, Container, Sticky} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {Cart} from '../components';
import {fetchCart} from '../store';

class SidebarCart extends Component {
	componentDidMount() {
		this.props.loadCart();
	}

	render() {
		const visible = this.props.showCart;

		return (
			<Container fluid>
				<Sidebar.Pushable as={Segment}>
					<Sidebar
						as={Menu}
						animation="overlay"
						direction="right"
						vertical
						visible={visible}
						width="wide"
					>
						<Sticky style={{padding: 20}}>
							<Cart />
						</Sticky>
					</Sidebar>

					<Sidebar.Pusher dimmed={visible}>{this.props.children}</Sidebar.Pusher>
				</Sidebar.Pushable>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	showCart: state.carts.showCart,
	isLoggedIn: !!state.user.id
});

const mapDispatchToProps = (dispatch) => ({
	loadCart: () => dispatch(fetchCart())
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarCart);
