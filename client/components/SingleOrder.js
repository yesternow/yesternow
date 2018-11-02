import {connect} from 'react-redux';
import React, {Component} from 'react';
import {fetchOrder} from '../store';
import {Button, Form, Grid, Header, Image, Message, Segment} from 'semantic-ui-react';

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
				<div className="ui grid centered">
					<select onChange={this.handleChange}>
						<option value="all">All</option>
					</select>
					<h2>Order id: {order.id}</h2>
					{lineItems.map((item) => (
						<div key={item.id}>
							<li>{item.product.title}</li>
							<p>{item.product.description}</p>
							<li>{item.price}</li>
							{item.product.images.map((image) => (
								<div key={image.id} className="ui grid column">
									<li>
										<img src={image.imageUrl} className="ui medium rounded image" />
									</li>
								</div>
							))}
						</div>
					))}
					{!this.props.order && <p>order does not exist</p>}
				</div>
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
