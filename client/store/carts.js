import axios from 'axios';

const SET_CARTS = 'SET_CARTS'
const SET_CART = 'SET_CART'

const setCarts = (carts) => ({
    type: SET_CARTS,
    carts
})
const setCart = (cart) => ({
    type: SET_CART,
    cart
})

export const fetchCarts = () => {
    return async dispatch => {
        const { data } = await axios.get('/api/carts')
        dispatch(setCarts(data))
    }
}

export const fetchCart = () => {
    return async dispatch => {
        const { data } = await axios.get('/api/cart')
        dispatch(setCart(data))
    }
}

const initialState = {
    carts: [],
    cart: {}
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_CARTS:
            return {...state, carts: action.carts}
        case SET_CART:
            return {...state, cart: action.cart}
        default:
            return state
    }
}
