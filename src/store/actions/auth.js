import { LOGIN, REGISTER, LOGOUT, UPDATE_PROFILE } from '../types';
import AuthService from '../../services/authService';

export const login = (params, history) => (dispatch) => {
	return AuthService.login(params)
		.then((data) => {
			dispatch({ type: LOGIN, payload: data });
			history.push('/');
		})
		.catch((error) => {
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
			throw error;
		});
};

export const logout = () => (dispatch) => {
	AuthService.logout();
	dispatch({ type: LOGOUT });
};

export const updateProfile = (params) => (dispatch) => {
	return AuthService.updateProfile(params)
		.then((data) => {
			dispatch({ type: UPDATE_PROFILE, payload: data });
		})
		.catch((error) => {
			throw error;
		});
};
