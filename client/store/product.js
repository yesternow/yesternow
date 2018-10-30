import axios from 'axios';

//Action Types
const SET_PRODUCTS = 'SET_PRODUCTS';

//Action Creator
export const setProducts = products => ({
  type: SET_PRODUCTS,
  products,
});

//Thunk Creator
export const fetchProducts = () => dispatch => {
  return axios
    .get('./api/products')
    .then(res => res.data)
    .then(products => dispatch(setProducts(products)))
    .catch(error => {
      console.error.bind(console);
    });
};

//Reducer
export const productsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
};
