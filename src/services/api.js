import axios from 'axios';
import store from '../redux/store';
import { logout } from '../redux/auth/actions';

const API = axios.create({
	baseURL: 'http://localhost:5000',
	headers: {
		Accept: 'application/json',
		Authorization: `Bearer ${localStorage.getItem('oitahcToken') || ''}`,
	},
});

/*
API.interceptors.response.use(
	(res) => {
		return res;
	},
	(err) => {
		if (err.response.status !== 401) {
			throw err;
		}

		if (typeof err.response.data.error.name !== 'undefined') {
			if (err.response.data.error.name === 'TokenExpiredError') {
				store.dispatch(logout());
				throw err;
			}
		}
	}
);
*/

API.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response.status !== 401) {
			throw error;
		}

		if (typeof error.response.data.error.name !== 'undefined') {
			if (error.response.data.error.name === 'TokenExpiredError') {
				store.dispatch(logout());
				throw error;
			}
		}
	}
);

export default API;
