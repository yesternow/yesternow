import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS';
const STATUS_FILTER = 'STATUS_FILTER';
const UPDATE_ORDER = 'UPDATE_ORDER';

/**
 * ACTION CREATORS
 */
const getOrders = orders => ({ type: GET_ORDERS, orders });

export const statusFilter = visibility => ({
  type: STATUS_FILTER,
  visibility,
});
export const updateOrder = order => ({
  type: UPDATE_ORDER,
  order,
});

/**
 * THUNK CREATORS
 */

export const fetchOrders = () => async dispatch => {
  try {
    const { data } = await axios.get(`/api/orders`);

    dispatch(getOrders(data));
  } catch (err) {
    console.error(err);
  }
};

export const putOrder = order => async dispatch => {
  try {
    await axios.put(`/api/orders/${order.id}`, order);
    dispatch(fetchOrders());
  } catch (err) {
    console.error(err);
  }
};

const initialState = {
  allOrders: [],
  isFetching: false,
  visibilityFilter: 'all',
};

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        allOrders: action.orders.filter(order => {
          if (state.visibilityFilter === 'all') {
            return order;
          } else {
            return order.status === state.visibilityFilter;
          }
        }),
      };
    case STATUS_FILTER:
      return { ...state, visibilityFilter: action.visibility };
    default:
      return state;
  }
}
