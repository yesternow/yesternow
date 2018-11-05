import React, {Component} from 'react';
import {fetchOrders, updateOrder, statusFilter} from '../store';
import {connect} from 'react-redux';
import {
	Table,
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
	Checkbox,
	Radio,
	Menu
} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class Orders extends Component {
	constructor() {
		super();
		this.state = {
			selected: 0,
			visibilityFilter: ''
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	componentDidMount() {
		this.props.loadOrders();
		const defaultOrder = this.props.orders[this.state.selected];
		this.setState({defaultOrder, selected: 0});
	}

	handleSubmit(evt) {
		evt.preventDefault();
		this.props.updateOrder(evt.target.id);
	}

	handleChange(event, data) {
		// this.props.setVisibility(event.target.value); //using jsx
		this.props.setVisibility(data.value); //using Semantic UI
		this.props.loadOrders();
		console.log(data);
	}
	render() {
		if (!this.props.orders) {
			return <div>Hello there are no orders yet</div>;
		}
		const statusOptions = [
			{text: 'created', value: 'created'},
			{text: 'processing', value: 'processing'},
			{text: 'cancelled', value: 'cancelled'},
			{text: 'shipped', value: 'shipped'},
			{text: 'delivered', value: 'delivered'}
		];
		const all = {text: 'all', value: 'all'};
		const actionOptions = [ {text: 'update', value: 'update'}, {text: 'remove', value: 'remove'} ];

		const orders = this.props.orders.allOrders;
		return (
			<Grid>
				<Table celled compact definition>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Order ID</Table.HeaderCell>
							<Table.HeaderCell>Date Created</Table.HeaderCell>
							<Table.HeaderCell>
								<Button.Group color="blue">
									<Dropdown
										onChange={this.handleChange}
										pointing
										floating
										button
										className="icon"
										search
										selection
										placeholder="Order Status"
										options={[ all, ...statusOptions ]}
										value={this.state.visibilityFilter}
									/>
								</Button.Group>
							</Table.HeaderCell>
							<Table.HeaderCell>User ID</Table.HeaderCell>
							<Table.HeaderCell>Name</Table.HeaderCell>
							<Table.HeaderCell>Email</Table.HeaderCell>
							<Table.HeaderCell>Line Item(s) ID</Table.HeaderCell>
							<Table.HeaderCell>Actions</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{orders.map((order) => (
							<Table.Row key={order.id}>
								<Table.Cell>
									<Link to={`/orders/${order.id}`}>{order.id}</Link>
								</Table.Cell>
								<Table.Cell>{order.createdAt.substring(0, 10)}</Table.Cell>
								<Table.Cell selectable>
									<Dropdown placeholder={order.status} fluid selection options={statusOptions} />
								</Table.Cell>
								<Table.Cell>
									<Link to={`/users/${order.userId}`}>{order.userId}</Link>
								</Table.Cell>
								<Table.Cell>
									{order.user.firstName} {order.user.lastName}
								</Table.Cell>
								<Table.Cell>{order.user.email}</Table.Cell>
								<Table.Cell>
									{order.lineItems.map((item, idx) => {
										if (idx === order.lineItems.length - 1) {
											return (
												<Link key={idx} to={`/products/${item.productId}`}>
													{item.productId}
												</Link>
											);
										}
										return (
											<Link key={idx} to={`/products/${item.productId}`}>
												{item.productId},{' '}
											</Link>
										);
									})}
								</Table.Cell>
								<Table.Cell selectable>
									<Dropdown placeholder="Select Action" fluid selection options={actionOptions} />
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>

					<Table.Footer fullWidth>
						<Table.Row>
							<Table.HeaderCell colSpan="9">
								<Button floated="right" icon labelPosition="left" primary size="small">
									<Icon name="user" /> Add User
								</Button>
								<Button size="small">Approve Selected</Button>
								<Button disabled size="small">
									Approve All
								</Button>
							</Table.HeaderCell>
						</Table.Row>
					</Table.Footer>
				</Table>

				<Form>
					<Form.Field>
						<label>Filter Orders</label>
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
				{/* First attempt at styling all orders is to use Cards
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
										Order ID: {order.id} created on {order.createdAt.substring(0, 4)}
									</Card.Description>
									<Card.Description>Order Status: {order.status}</Card.Description>
								</Card.Content>

								{order.lineItems.map((item) => (
									<Card key={item.productId}>
										<Card.Content>Product ID: {item.productId}</Card.Content>
										<Segment>
											<List.Content>
												<List.Content>item: {item.product.title}</List.Content>
												<List.Content> brand: {item.product.brand || 'n/a'}</List.Content>
												<List.Content>Stock: {item.quantity}</List.Content>
												<List.Content>price (in cents): {item.price}</List.Content>
											</List.Content>
										</Segment>
									</Card>
								))}
							</Card>
						</Card.Group>
					))}
				</Grid.Row> */}

				{/* <Grid.Row>
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
				</Grid.Row> */}
			</Grid>
		);
	}
}

const mapStateToProps = (state) => ({
	orders: state.orders
});

const mapDispatchToProps = (dispatch) => ({
	loadOrders: () => dispatch(fetchOrders()),
	updateOrder: (id) => dispatch(updateOrder(id)),
	setVisibility: (visibility) => dispatch(statusFilter(visibility))
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
