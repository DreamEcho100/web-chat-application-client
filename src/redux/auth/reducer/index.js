import { LOGIN, REGISTER, LOGOUT, UPDATE_PROFILE } from '../types';

const initialState = {
	user: JSON.parse(localStorage.getItem('oitahcUser')) || {},
	token: localStorage.getItem('oitahcToken') || '',
	isLoggedIn: !!localStorage.getItem('oitahcToken'),
};

const authReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case LOGIN:
			return {
				...state,
				user: payload.user,
				token: payload.token,
				isLoggedIn: true,
			};
			// eslint-disable-next-line no-unreachable
			break;

		case REGISTER:
			return {
				...state,
				user: payload.user,
				token: payload.token,
				isLoggedIn: true,
			};
			// eslint-disable-next-line no-unreachable
			break;

		case LOGOUT:
			return {
				...state,
				user: {},
				token: '',
				isLoggedIn: false,
			};
			// eslint-disable-next-line no-unreachable
			break;

		case UPDATE_PROFILE:
			return {
				...state,
				user: payload,
			};
			// eslint-disable-next-line no-unreachable
			break;

		default:
			return state;
			// eslint-disable-next-line no-unreachable
			break;
	}
};

export default authReducer;
