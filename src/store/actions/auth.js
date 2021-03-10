import { LOGIN } from '../types/auth';
import AuthService from '../../services/authService';

export const login = (params) => (dispatch) => {
	return AuthService.login(params)
		.then((data) => {
			console.log(data);
			dispatch({ type: LOGIN, payload: data });
		})
		.catch((error) => {
			console.error('Auth service error', error);
			throw error;
		});
};
