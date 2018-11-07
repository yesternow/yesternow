import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import product from './product';
import users from './users';
import carts from './carts';
import order from './order';
import orders from './orders';
import review from './review';
import address from './address'
import guestInfo from './guestInfo'

const reducer = combineReducers({
  user,
  users,
  product,
  carts,
  order,
  orders,
  address,
  guestInfo
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './users';
export * from './product';
export * from './carts';
export * from './order';
export * from './orders';
export * from './review';
export * from './address';
export * from './guestInfo';
