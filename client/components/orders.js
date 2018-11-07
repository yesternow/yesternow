import React, {Component} from 'react';
import {fetchOrders, statusFilter, putOrder} from '../store';
import {connect} from 'react-redux';
import {
	Table,
	Container,
	Dropdown,
	Input,
	Image,
	Grid,
	Button,
	Icon,
	Select,
	List,
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
			visibilityFilter: '',
			status: '',
			order: {}
		};
		this.handleFilter = this.handleFilter.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.updateOrder = this.updateOrder.bind(this);
		this.setOrderToUpdate = this.setOrderToUpdate.bind(this);
	}
	componentDidMount() {
		this.props.loadOrders();
		const defaultOrder = this.props.orders[this.state.selected];
		this.setState({defaultOrder, selected: 0});
	}

	handleFilter(evt, data) {
		this.props.setVisibility(data.value); //using Semantic UI
		this.props.loadOrders();
	}

	handleChange(event, data) {
		this.state.order.status = data.value;
		console.log(this.state.order);
		const order = this.state.order;
		this.props.updateOrder(order);
		this.props.loadOrders();
	}

	updateOrder(data) {
		this.setState({...this.state, order: {...this.state.order, status: data.value}});
	}

	setOrderToUpdate(order) {
		this.state = {...this.state, order};
	}
	render() {
		if (!this.props.orders.allOrders) {
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
			<Grid padded centered>
				<Table celled compact definition>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Order ID</Table.HeaderCell>
							<Table.HeaderCell>Date Created</Table.HeaderCell>
							<Table.HeaderCell>
								<Button.Group color="blue">
									<Dropdown
										pointing
										floating
										button
										className="icon"
										search
										selection
										onChange={this.handleFilter}
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
									<Dropdown
										placeholder={order.status}
										fluid
										selection
										onClick={() => {
											this.setOrderToUpdate(order);
										}}
										options={statusOptions}
										onChange={this.handleChange}
										value={order.status}
									/>
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
							<Table.HeaderCell colSpan="9" />
						</Table.Row>
					</Table.Footer>
				</Table>
			</Grid>
		);
	}
}

const mapStateToProps = (state) => ({
	orders: state.orders
});

const mapDispatchToProps = (dispatch) => ({
	loadOrders: () => dispatch(fetchOrders()),
	setVisibility: (visibility) => dispatch(statusFilter(visibility)),
	updateOrder: (order) => dispatch(putOrder(order))
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
