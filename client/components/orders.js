import React, {Component} from 'react';
import {fetchOrders} from '../store';
import {connect} from 'react-redux';
import {Container, Dropdown, Input, Card, Divider, Image, Grid, Button, Icon, Select} from 'semantic-ui-react';
import {List} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class Orders extends Component {
	componentDidMount() {
		this.props.loadOrders();
	}
	render() {
		if (!this.props.orders) {
			return <div>Hello there are no orders yet</div>;
		}

		return (
			<List>
				<List.Item>
					<List.Icon name="users" />
					<List.Content>Semantic UI</List.Content>
				</List.Item>
				<List.Item>
					<List.Icon name="marker" />
					<List.Content>New York, NY</List.Content>
				</List.Item>
				<List.Item>
					<List.Icon name="mail" />
					<List.Content>
						<a href="mailto:jack@semantic-ui.com">jack@semantic-ui.com</a>
					</List.Content>
				</List.Item>
				<List.Item>
					<List.Icon name="linkify" />
					<List.Content>
						<a href="http://www.semantic-ui.com">semantic-ui.com</a>
					</List.Content>
				</List.Item>
			</List>
			// <Container>
			// 	<Grid>
			// 		<Grid.Row>
			// 			<Card.Group itemsPerRow={4}>
			// 				<h1>Orders</h1>
			// 				{this.props.orders.map((order) => (
			// 					<Card key={order.id}>
			// 						<Card.Content>
			// 							<Card.Header>Order ID: {order.id}</Card.Header>
			// 							<Card.Description>
			// 								Tracking: {order.tracking} Address: {order.addressId} User: {order.userId}
			// 							</Card.Description>
			// 						</Card.Content>
			// 					</Card>
			// 				))}
			// 			</Card.Group>
			// 		</Grid.Row>
			// 	</Grid>
			// </Container>
		);
	}
}

const mapStateToProps = (state) => ({
	orders: state.orders
});

const mapDispatchToProps = (dispatch) => ({
	loadOrders: () => dispatch(fetchOrders())
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
