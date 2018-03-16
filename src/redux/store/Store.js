import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import blogsReducer from '../reducers/BlogsReducer';
import filterReducer from '../reducers/FilterReducer';
import userReducer from '../reducers/UserReducer';

const composeEnhancers = compose;//(typeof window === 'undefined') ? compose : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
// Combine Reducers
const reducers = combineReducers({
  blogsState: blogsReducer,
  filtersState: filterReducer,
  userState: userReducer
});

// const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
export default function (initialState = {}) {
  return createStore(reducers, initialState, composeEnhancers(applyMiddleware(thunk)));
}

