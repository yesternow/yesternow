import axios from 'axios';

const SET_CARTS = 'SET_CARTS'
const SET_CART = 'SET_CART'
const TOGGLE_CART = 'TOGGLE_CART'
const UPDATE_CART = 'UPDATE_CART'

const setCarts = (carts) => ({
    type: SET_CARTS,
    carts
})
const setCart = (cart) => ({
    type: SET_CART,
    cart
})

const updateCart = cartItem => ({
    type: UPDATE_CART,
    cartItem
})

export const toggleCart = () => ({
    type: TOGGLE_CART
})

export const fetchCarts = () => {
    return async dispatch => {
        const { data } = await axios.get('/api/carts')
        dispatch(setCarts(data))
    }
}

export const sendAddToCart = productId => {
    return async dispatch => {
        const { data } = await axios.put('/api/cart/', productId)
        dispatch(updateCart(data))
    }
}

const defaultCart = {cartItems:[]}

export const fetchCart = () => {
    return async dispatch => {
        const { data } = await axios.get('/api/cart')
        dispatch(setCart(data || defaultCart))
    }
}

const initialState = {
    carts: [],
    cart: {},
    showCart: false
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_CARTS:
            return {...state, carts: action.carts}
        case SET_CART:
            return {...state, cart: action.cart}
        case TOGGLE_CART:
            return {...state, showCart: !state.showCart}
        // case UPDATE_CART:
        //     return {...state, cart: {...state.cart, cartItems: [...state.cart.cartItems, action.cartItem]}}
        default:
            return state
    }
}
