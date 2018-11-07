import axios from 'axios';
import guestInfo, { updateInfo } from './guestInfo';

const FETCH_ADDRESSES = 'FETCH_ADDRESSES'
const SELECT_ADDRESS= 'SELECT_ADDRESS'

const setAddresses = (addresses) => ({
    type: FETCH_ADDRESSES,
    addresses
})

export const selectAddress = address => ({
    type: SELECT_ADDRESS,
    address
})

export const fetchAddresses = () => {
    return async dispatch => {
        try {
            const { data } = await axios.get('/api/addresses')
            dispatch(setAddresses(data))
        }  catch (err) {
            if(err.status === 404){
                dispatch(setAddresses([]))
            }
            console.log(err)
        }
    }
}

export const addAddress = address => {
    return async dispatch => {
        try {
            const {data} = await axios.post('/api/addresses', address)
            dispatch(updateInfo("addressId", data.id))
            dispatch(fetchAddresses())
        } catch (err) {
            console.log(err)
        }
    }
}

const initialState =  {
    addresses: [],
    selectedAddress: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ADDRESSES:
            return {...state, addresses: action.addresses}
        case SELECT_ADDRESS:
            return {...state, selectedAddress: action.address}
        default:
            return state
    }
}


