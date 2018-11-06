import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_USER_ORDERS = 'GET_USER_ORDERS';
const GET_USERS = 'GET_USERS';
const GET_USER2 = 'GET_USER2';
const REMOVE_USER_DB = 'REMOVE_USER_DB';
const UPDATE_USER = 'UPDATE_USER';
/**
 * ACTION CREATORS
 */
const getUser = (user) => ({type: GET_USER2, user});
const getUserOrders = (order) => ({type: GET_USER_ORDERS, order});
const getUsers = (users) => ({type: GET_USERS, users});
const removeUserDb = (userId) => ({type: REMOVE_USER_DB, userId});
const updateUser = (user) => ({type: UPDATE_USER, user});
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

export const grabUsers = () => async (dispatch) => {
	try {
		const {data} = await axios.get('/api/users/');
		dispatch(getUsers(data));
	} catch (err) {
		console.error(err);
	}
};

export const sendRemoveUser = (userId) => async (dispatch) => {
	try {
		await axios.delete(`/api/users/${userId}`);
		dispatch(removeUserDb(userId));
	} catch (err) {
		console.error(err);
	}
};

export const sendUpdateUser = (user) => async (dispatch) => {
	try {
		await axios.put(`/api/users/${user.id}`, user);
		const {data} = await axios.get(`/api/users/${user.id}`);
		dispatch(updateUser(data));
	} catch (err) {
		console.error(err);
	}
};

export const fetchUserOrders = (userId) => async (dispatch) => {
	try {
		const {data} = await axios.get(`/api/users/${userId}/orders`);
		dispatch(getUserOrders(data));
	} catch (err) {
		console.error(err);
	}
};

const initialState = {
	user: [],
	users: [],
	orders: []
};

/**
 * REDUCER
 */

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_USER_ORDERS:
			return {...state, orders: action.order};
		case GET_USERS:
			return {...state, users: action.users};
		case GET_USER2:
			return {...state, user: action.user};
		case REMOVE_USER_DB:
			return {
				...state,
				users: state.users.filter((user) => user.id !== action.userId)
			};
		case UPDATE_USER:
			return {
				...state,
				users: state.users.map((user) => (user.id === action.user.id ? action.user : user)),
				user: action.user
			};
		default:
			return state;
	}
}
