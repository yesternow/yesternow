import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_ORDER = 'GET_ORDER';
const REMOVE_ORDER = 'REMOVE_ORDER';

/**
 * INITIAL STATE
 */
const defaultOrder = {};

/**
 * ACTION CREATORS
 */
const getOrder = (order) => ({type: GET_ORDER, order});
const removeOrder = () => ({type: REMOVE_ORDER});

/**
 * THUNK CREATORS
 */
export const fetchOrder = (id) => async (dispatch) => {
	try {
		const {data} = await axios.get(`/api/orders/${id}`);
		dispatch(getOrder(data));
	} catch (err) {
		console.error(err);
	}
};
export const updateOrder = (id) => async (dispatch) => {
	try {
		await axios.put(`/api/orders/${id}`);
		dispatch(fetchOrder(id));
	} catch (err) {
		console.error(err);
	}
};

/**
 * REDUCER
 */
export default function(state = defaultOrder, action) {
	switch (action.type) {
		case GET_ORDER:
			return action.order;
		case REMOVE_ORDER:
			return defaultOrder;
		default:
			return state;
	}
}
