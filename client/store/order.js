import axios from 'axios';
import history from '../history'
import { clearCart } from './'

/**
 * ACTION TYPES
 */
const GET_ORDER = 'GET_ORDER';
const REMOVE_ORDER = 'REMOVE_ORDER';
const NEW_ORDER = 'NEW_ORDER'

/**
 * INITIAL STATE
 */
const defaultOrder = {};

/**
 * ACTION CREATORS
 */
const getOrder = (order) => ({type: GET_ORDER, order});

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
export const updateSingleOrder = (order) => async (dispatch) => {
	try {
		await axios.put(`/api/orders/${order.id}`, order);
		dispatch(fetchOrder(id));
	} catch (err) {
		console.error(err);
	}
};

export const createNewOrder = order => async dispatch => {
	try {
		const { data } =  await axios.post('/api/orders', order)
		dispatch(clearCart())
		history.push(`/orders/${data.id}`)
	} catch (err){
		console.log(err)
	}
}

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
