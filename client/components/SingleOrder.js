import {connect} from 'react-redux';
import React, {Component} from 'react';

class SingleOrder extends Component {
	componentDidMount() {
		 this.props.loadOrder();
	}
	render() {
		if (!this.props.order) {
			return <div>Hello, order does not exist</div>;
		}
		return (
			<div>
				<select onChange={this.handleChange}>
					<option value="all">All</option>
				</select>
				<h2>Order id: {this.props.order.id}</h2>
				{this.props.order.lineItems.map((line) => (
					<div>
						<li>{line.product.title}</li>
						<p>{line.product.description}</p>
						<li>{line.price}</li>
						{/* <li>{line.product.image.imageUrl}</li> */}
					</div>
				))}
				{!this.props.order && <p>order does not exist</p>}
			</div>
		);
	}
}
const mapStateToProps = (state) => ({
	order: state.order
});

const mapDispatchToProps = (dispatch) => ({
	loadOrder: (orderId) => dispatch(fetchOrders(orderId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder);
