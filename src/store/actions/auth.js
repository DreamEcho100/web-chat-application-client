import { LOGIN, REGISTER, LOGOUT } from '../types/auth';
import AuthService from '../../services/authService';

export const login = (params, history) => (dispatch) => {
	return AuthService.login(params)
		.then((data) => {
			dispatch({ type: LOGIN, payload: data });
			history.push('/');
		})
		.catch((error) => {
			console.error('Auth service error', error);
			throw error;
		});
};

export const register = (params, history) => (dispatch) => {
	return AuthService.register(params)
		.then((data) => {
			dispatch({ type: REGISTER, payload: data });
			history.push('/');
		})
		.catch((error) => {
			console.error('Auth service error', error);
			throw error;
		});
};

export const logout = () => (dispatch) => {
	AuthService.logout();
	dispatch({ type: LOGOUT });
};
