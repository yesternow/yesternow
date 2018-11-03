import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS';

/**
 * ACTION CREATORS
 */
const getOrders = (orders) => ({type: GET_ORDERS, orders});

/**
 * THUNK CREATORS
 */

export const fetchOrders = () => async (dispatch) => {
	try {
		const {data} = await axios.get(`/api/orders`);
		dispatch(getOrders(data));
	} catch (err) {
		console.error(err);
	}
};

/**
 * REDUCER
 */
export default function(state = [], action) {
	switch (action.type) {
		case GET_ORDERS:
			return action.orders;
		default:
			return state;
	}
}
