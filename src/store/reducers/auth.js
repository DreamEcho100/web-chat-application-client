import { LOGIN, REGISTER } from '../types/auth';

const initialState = {
	user: {},
	token: '',
	isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case LOGIN:
			return {
				...state,
				user: payload,
				token: payload.token,
				isLoggedIn: true,
			};
			// eslint-disable-next-line no-unreachable
			break;

		case REGISTER:
			return {
				...state,
				user: payload,
				token: payload.token,
				isLoggedIn: true,
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
