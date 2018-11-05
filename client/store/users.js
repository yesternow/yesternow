import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS';

/**
 * ACTION CREATORS
 */
const getUser = (user) => ({type: GET_USERS, user});

/**
 * THUNK CREATORS
 */

export const grabUser = (userId) => async (dispatch) => {
	try {
		const {data} = await axios.get(`/api/users/${userId}`);
		dispatch(getUser(data));
	} catch (err) {
		console.error(err);
	}
};

export const fetchUserOrders = (userId) => async (dispatch) => {
	try {
		const {data} = await axios.get(`/api/users/${userId}/orders`);
		dispatch(getUser(data));
	} catch (err) {
		console.error(err);
	}
};

/**
 * REDUCER
 */
export default function(state = [], action) {
	switch (action.type) {
		case GET_USERS:
			return action.user;
		default:
			return state;
	}
}
