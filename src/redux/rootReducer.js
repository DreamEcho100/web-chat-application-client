import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import chatReducer from './chat/reducer';

export default combineReducers({
	authReducer,
	chatReducer,
});
