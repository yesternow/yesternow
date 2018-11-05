import {connect} from 'react-redux';
import React, {Component} from 'react';
import {fetchOrder} from '../store';
import {Button, Form, Grid, Header, Image, Message, Segment, List} from 'semantic-ui-react';

class SingleOrder extends Component {
	componentDidMount() {
		this.props.loadOrder(this.props.match.params.id);
	}
	render() {
		if (!this.props.order.lineItems) {
			return <div>loading..</div>;
		} else {
			const order = this.props.order;
			const lineItems = this.props.order.lineItems;
			console.log(order.lineItems);
			return (
				<List celled>
					<List.Item>
						<List.Content>
							<List.Header>Order ID: {order.id}</List.Header>
							{lineItems.map((item) => (
								<List key={item.id} celled>
									<Image
										floated="right"
										verticalAlign="middle"
										size="mini"
										src={item.product.images[0].imageUrl}
										className="ui medium rounded image"
									/>
									<List.Content>
										<List.Header>{item.product.title}</List.Header>
										<List.Description>Description: {item.product.description}</List.Description>
										<List.Description>Price: {item.price}¢</List.Description>
									</List.Content>
								</List>
							))}
						</List.Content>
					</List.Item>
				</List>
			);
		}
	}
}
const mapStateToProps = (state) => ({
	order: state.order
});

const mapDispatchToProps = (dispatch) => ({
	loadOrder: (orderId) => dispatch(fetchOrder(orderId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder);
