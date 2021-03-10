import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const middlewares = [thunk, logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
