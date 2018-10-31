import axios from 'axios';

//Action Types
const SET_PRODUCTS = 'SET_PRODUCTS';
const NEW_PRODUCT = 'NEW_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const FETCH_REQUEST = 'FETCH_REQUEST';
const FETCH_FAILURE = 'FETCH_FAILURE';

//Action Creator
export const setProducts = products => ({
  type: SET_PRODUCTS,
  products,
});

export const newProduct = product => ({
  type: NEW_PRODUCT,
  product,
});

export const removeProduct = productId => ({
  type: REMOVE_PRODUCT,
  productId,
});

export const updateProduct = product => ({
  type: UPDATE_PRODUCT,
  product,
});

const fetchRequest = () => ({ type: FETCH_REQUEST });

const fetchFailure = error => ({
  type: FETCH_FAILURE,
  error: 'Failed to fetch products',
  payload: error,
});

//Thunk Creator
export const fetchProducts = () => dispatch => {
  dispatch(fetchRequest());
  return axios
    .get('./api/products')
    .then(res => res.data)
    .then(products => dispatch(setProducts(products)))
    .catch(error => {
      console.error.bind(console);
      dispatch(fetchFailure(error));
    });
};

export const addProduct = product => dispatch => {
  return axios
    .post('/api/products', product)
    .then(res => dispatch(newProduct(res.data)))
    .catch(console.error.bind(console));
};

export const deleteProduct = productId => dispatch => {
  return axios
    .delete(`api/products/${productId}`)
    .then(() => dispatch(removeProduct(productId)))
    .catch(console.error.bind(console));
};

export const sendProductUpdate = product => dispatch => {
  return axios
    .put(`./api/products/${product.id}`, product)
    .then(() => dispatch(updateProduct(product)))
    .catch(console.error.bind(console));
};

const initialState = { products: [], isFetching: false };

//Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return { ...state, isFetching: true };
    case FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case SET_PRODUCTS:
      return { ...state, products: action.products, isFetching: false };
    case NEW_PRODUCT:
      return { ...state, products: [...state.products, action.product] };
    case REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          product => product.id !== action.productId
        ),
      };
    default:
      return state;
  }
};
