const UPDATE_INFO = "UPDATE_INFO";
const CLEAR_INFO = "CLEAR_INFO";

export const updateInfo = ( key, value) => ({
  type: UPDATE_INFO,
  key,
  value
});

export const clearInfo = () => ({
  type: CLEAR_INFO
});

const initialState = {
  address1: "",
  address2: "",
  city: "",
  state: "",
  country: "",
  zipcode: 0,
  guestEmail: "",
  guestNumber: "",
  addressId: 0
};

export default (state= initialState, action) => {
    switch (action.type) {
        case UPDATE_INFO:
            return {...state, [action.key]: action.value}
        case CLEAR_INFO:
            return initialState
        default:
            return state
    }
}
