import axios from 'axios';
import history from '../history';
import { fetchCart, clearCart } from './'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = (user) => ({type: GET_USER, user});
const removeUser = () => ({type: REMOVE_USER});

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
	try {
		const res = await axios.get('/auth/me');
		dispatch(getUser(res.data || defaultUser));
	} catch (err) {
		console.error(err);
	}
};

export const auth = (email, password, method) => async (dispatch) => {
	let res;
	try {
		res = await axios.post(`/auth/${method}`, {
			email,
			password
		});
	} catch (authError) {
		return dispatch(getUser({error: authError}));
	}

	try {
		dispatch(getUser(res.data));
		if(method === 'signup'){
			// await axios.post('/api/cart', {userId: res.data.id})
			history.push(`/users/${res.data.id}`)

		}
		else{
			history.push('/');
		}
		dispatch(fetchCart())
	} catch (dispatchOrHistoryErr) {
		console.error(dispatchOrHistoryErr);
	}
};

export const logout = () => async (dispatch) => {
	try {
		await axios.post('/auth/logout');
		dispatch(removeUser());
		dispatch(clearCart())
		history.push('/login');
	} catch (err) {
		console.error(err);
	}
};

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
	switch (action.type) {
		case GET_USER:
			return action.user;
		case REMOVE_USER:
			return defaultUser;
		default:
			return state;
	}
}
