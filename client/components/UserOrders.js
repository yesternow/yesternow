import React, {Component} from 'react';
import {fetchUserOrders, updateOrder} from '../store';
import {connect} from 'react-redux';
import {
	Container,
	Dropdown,
	Input,
	Card,
	Divider,
	Image,
	Grid,
	Button,
	Icon,
	Select,
	List,
	Rail,
	Sticky,
	Header,
	Segment,
	Form,
	Field,
	Checkbox
} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class Orders extends Component {
	constructor() {
		super();
		this.state = {
			selected: 0
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount() {
		this.props.loadOrders(this.props.match.params.id);
		const defaultOrder = this.props.orders[this.state.selected];
		this.setState({defaultOrder, selected: 0});
	}

	handleSubmit(evt) {
		evt.preventDefault();
		this.props.updateOrder(evt.target.id);
	}
	render() {
		if (!this.props.orders) {
			return <div>Hello there are no orders yet</div>;
		}
		const orders = this.props.orders;
		return (
			<Grid className="cardOrders">
				<Grid.Row>
					{orders.map((order) => (
						<Card.Group key={order.id}>
							<Card>
								<Card.Content>
									<Card.Meta>
										<span className="date">Joined in {order.createdAt.substring(0, 4)}</span>
									</Card.Meta>
									<Card.Header>
										{order.user.firstName} {order.user.lastName}
									</Card.Header>

									<Card.Description>email: {order.user.email}</Card.Description>
									<Card.Description>mobile: {order.user.phone || 'unlisted'}</Card.Description>
									<Card.Description>User ID: {order.userId}</Card.Description>
									<Card.Description>
										Order ID: {order.id} created on {order.createdAt.substring(0, 10)}
									</Card.Description>
									<Card.Description>Order Status: {order.status}</Card.Description>
								</Card.Content>

								{order.lineItems.map((item) => (
									<Card key={item.productId}>
										<Card.Content>Product ID: {item.productId}</Card.Content>
										<List.Content>
											<List.Content>item: {item.product.title}</List.Content>
											<List.Content> brand: {item.product.brand || 'n/a'}</List.Content>
											<List.Content>Stock: {item.quantity}</List.Content>
											<List.Content>price (in cents): {item.price}</List.Content>
										</List.Content>
									</Card>
								))}
							</Card>
						</Card.Group>
					))}
				</Grid.Row>

				<Form>
					<Form.Field>
						<label>First Name</label>
						<input placeholder="First Name" />
					</Form.Field>
					<Form.Field>
						<label>Last Name</label>
						<input placeholder="Last Name" />
					</Form.Field>
					<Form.Field>
						<Checkbox label="I agree to the Terms and Conditions" />
					</Form.Field>
					<Button type="submit">Submit</Button>
				</Form>
				<Grid.Row>
					<Rail position="right">
						<Segment>Left Rail Content</Segment>
					</Rail>
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
				</Grid.Row>
			</Grid>
		);
	}
}

const mapStateToProps = (state) => ({
	orders: state.users.orders
});

const mapDispatchToProps = (dispatch) => ({
	loadOrders: (userId) => dispatch(fetchUserOrders(userId)),
	updateOrder: (id) => dispatch(updateOrder(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
