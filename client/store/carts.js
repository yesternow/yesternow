import axios from 'axios';

const SET_CARTS = 'SET_CARTS';
const SET_CART = 'SET_CART';
const TOGGLE_CART = 'TOGGLE_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CLEAR_CART = 'CLEAR_CART';

const setCarts = carts => ({
  type: SET_CARTS,
  carts,
});
const setCart = cart => ({
  type: SET_CART,
  cart,
});


const removeFromCart = cartItemId => ({
  type: REMOVE_FROM_CART,
  cartItemId,
});

export const toggleCart = () => ({
  type: TOGGLE_CART,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const fetchCarts = () => {
  return async dispatch => {
    const { data } = await axios.get('/api/carts');

    dispatch(setCarts(data));
  };
};

export const sendAddToCart = (cartItem, isUpdate) => {
  return async dispatch => {
    await axios.put('/api/cart/', cartItem);
    const { data } = await axios.get('/api/cart');
    dispatch(setCart(data));
    if (!isUpdate) {
      dispatch(toggleCart());
    }
  };
};

export const removeCartItem = cartItemId => {
  return async dispatch => {
    await axios.delete(`/api/cart/${cartItemId}`);
    dispatch(removeFromCart(cartItemId));
  };
};



export const fetchCart = () => {
  return async dispatch => {
    const { data } = await axios.get('/api/cart');
    dispatch(setCart(data));
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
    case REMOVE_FROM_CART:
      const updatedCart = state.cart.cartItems.filter(
        cartItem => cartItem.id !== action.cartItemId
      );
      return { ...state, cart: { ...state.cart, cartItems: updatedCart } };
    case CLEAR_CART:
      return { ...state, cart: {} };
    default:
      return state;
  }
};
