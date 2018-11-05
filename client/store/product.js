import axios from 'axios';

//Action Types
const SET_PRODUCTS = 'SET_PRODUCTS';
const NEW_PRODUCT = 'NEW_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const FETCH_REQUEST = 'FETCH_REQUEST';
const FETCH_FAILURE = 'FETCH_FAILURE';
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
const SET_SORT_FILTER = 'SET_SORT_FILTER';
const SET_CATEGORIES = 'SET_CATEGORIES';
const GET_PRODUCT = 'GET_PRODUCT';

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

export const setVisibility = visibility => ({
  type: SET_VISIBILITY_FILTER,
  visibility,
});

export const setSort = sort => ({
  type: SET_SORT_FILTER,
  sort,
});

const setCategories = categories => ({
  type: SET_CATEGORIES,
  categories,
});

const fetchRequest = () => ({ type: FETCH_REQUEST });

const fetchFailure = error => ({
  type: FETCH_FAILURE,
  error: 'Failed to fetch products',
  payload: error,
});

const getProduct = product => ({
  type: GET_PRODUCT,
  product,
});

//Thunk Creator
export const fetchProducts = () => dispatch => {
  dispatch(fetchRequest());
  return axios
    .get('/api/products')
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
    .delete(`/api/products/${productId}`)
    .then(() => dispatch(removeProduct(productId)))
    .catch(console.error.bind(console));
};

export const sendProductUpdate = product => dispatch => {
  return axios
    .put(`/api/products/${product.id}`, product)
    .then(updatedProduct => dispatch(updateProduct(updatedProduct)))
    .catch(console.error.bind(console));
};

export const fetchCategories = () => {
  return async dispatch => {
    const { data } = await axios.get('/api/products/categories');
    dispatch(setCategories(data));
  };
};

export const fetchProduct = productId => {
  return async dispatch => {
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch(getProduct(data));
  };
};

const initialState = {
  products: [],
  isFetching: false,
  visibilityFilter: 'all',
  sortFilter: 'a-i',
  categories: [],
  product: {},
};

//visibilityFilter options: all, or cateforyID
//sortFIlter options: a-i for alphabetical-increase, a-d for alphabetical-decrease, p-i price-increase, p-d price-decrease

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
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: [...state.products].map(
          product =>
            product.id === action.product.id ? action.product : product
        ),
      };
    case SET_CATEGORIES:
      return {
        ...state,
        categories: [...state.categories, ...action.categories],
      };
    case SET_VISIBILITY_FILTER:
      return { ...state, visibilityFilter: action.visibility };
    case SET_SORT_FILTER:
      return { ...state, sortFilter: action.sort };
    case GET_PRODUCT:
      return { ...state, product: action.product };
    default:
      return state;
  }
};
