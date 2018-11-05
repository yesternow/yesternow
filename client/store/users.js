import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const GET_USERS = 'GET_USERS';
const REMOVE_USER = 'REMOVE_USER';
const UPDATE_USER = 'UPDATE_USER';
/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const getUsers = users => ({ type: GET_USERS, users });
const removeUser = userId => ({ type: REMOVE_USER, userId });
const updateUser = user => ({ type: UPDATE_USER, user });
/**
 * THUNK CREATORS
 */

export const grabUser = userId => async dispatch => {
  try {
    const { data } = await axios.get(`/api/users/${userId}`);
    dispatch(getUser(data));
  } catch (err) {
    console.error(err);
  }
};

export const grabUsers = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/users/');
    dispatch(getUsers(data));
  } catch (err) {
    console.error(err);
  }
};

export const sendRemoveUser = userId => async dispatch => {
  try {
    await axios.delete(`/api/users/${userId}`);
    dispatch(removeUser(userId));
  } catch (err) {
    console.error(err);
  }
};

export const sendUpdateUser = user => async dispatch => {
  try {
    await axios.put(`/api/users/${user.userId}`, user);
    const { data } = await axios.get(`/api/users/${user.userId}`);
    dispatch(updateUser(data));
  } catch (err) {
    console.error(err);
  }
};

export const fetchUserOrders = userId => async dispatch => {
  try {
    const { data } = await axios.get(`/api/users/${userId}/orders`);
    dispatch(getUser(data));
  } catch (err) {
    console.error(err);
  }
};

const initialState = {
  user: [],
  users: [],
};

/**
 * REDUCER
 */

export default function(state = [], action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.user };
    case GET_USERS:
      return { ...state, users: action.users };
    case REMOVE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.userId),
      };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map(
          user => (user.id === action.user.id ? action.user : user)
        ),
      };
    default:
      return state;
  }
}
