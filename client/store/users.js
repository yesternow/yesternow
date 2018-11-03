import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';

/**
 * ACTION CREATORS
 */
const getUser = (user) => ({type: GET_USER, user});

/**
 * THUNK CREATORS
 */

export const grabUser = (userId) => async (dispatch) => {
	try {
		const {data} = await axios.get(`/users/${userId}`);
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
		case GET_USER:
			return action.user;
		default:
			return state;
	}
}
