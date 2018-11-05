import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Login,
  Signup,
  UserHome,
  Products,
  AddProduct,
  UpdateProduct,
  SingleProduct,
  Carts,
  Cart,
  SingleOrder,
  Orders,
  SingleUser,
  UserOrders,
  Users,
  AllProductsAdmin,
} from './components';
import { me, fetchCart } from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
    this.props.loadCart();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;


		return (
			<Switch>
				{/* Routes placed here are available to all visitors */}
				<Route exact path="/" component={Products} />
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
				<Route exact path="/products" component={Products} />
				<Route path="/products/:id" component={SingleProduct} />
				<Route path="/carts" component={Carts} />
				<Route exact path="/cart" component={Cart} />
				<Route exact path="/orders/:id" component={SingleOrder} />

				{isAdmin &&
				isLoggedIn && (
					<Switch>
						{/* Routes placed here are only available after logging in as Admin */}
						<Route path="/addproduct" component={AddProduct} />
						<Route
                path="/updateproduct/:productId"
                component={UpdateProduct}
              />
						<Route exact path="/orders" component={Orders} />
      
					</Switch>
				)}
				{isLoggedIn && (
					<Switch>
						{/* Routes placed here are only available after logging in */}
						<Route exact path="/users/:id" component={SingleUser} />
						<Route path="/users/:id/orders" component={UserOrders} />
						<Route path="/home" component={UserHome} />
					</Switch>
				)}
				{/* Displays our Login component as a fallback */}
        <Route component={Products} />
			</Switch>
		);
	}

}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin,
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    },
    loadCart() {
      dispatch(fetchCart());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
