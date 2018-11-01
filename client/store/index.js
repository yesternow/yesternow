import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './user';
import product from './product';
import users from './users';
import carts from './carts'


const reducer = combineReducers({user, users, product, carts});
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({collapsed: true})));
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './users';
export * from './product';
export * from './carts';
