import axios from 'axios';

const SET_CARTS = 'SET_CARTS';
const SET_CART = 'SET_CART';
const TOGGLE_CART = 'TOGGLE_CART';

const setCarts = carts => ({
  type: SET_CARTS,
  carts,
});
const setCart = cart => ({
  type: SET_CART,
  cart,
});

export const toggleCart = () => ({
  type: TOGGLE_CART,
});

export const fetchCarts = () => {
  return async dispatch => {
    const { data } = await axios.get('/api/carts');
    dispatch(setCarts(data));
  };
};

const defaultCart = { cartItems: [] };

export const fetchCart = () => {
  return async dispatch => {
    const { data } = await axios.get('/api/cart');
    dispatch(setCart(data || defaultCart));
  };
};

const initialState = {
  carts: [],
  cart: {},
  showCart: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CARTS:
      return { ...state, carts: action.carts };
    case SET_CART:
      return { ...state, cart: action.cart };
    case TOGGLE_CART:
      return { ...state, showCart: !state.showCart };
    default:
      return state;
  }
};
