import API from './api';

const AuthService = {
	login: (data) => {
		return API.post('/login', data)
			.then(({ data }) => {
				API.defaults.headers['Authorization'] = `Bearer ${data.token}`;
				return data;
			})
			.catch((error) => {
				console.error('Auth service error', error);
				throw error;
			});
	},
	register: (data) => {
		return API.post('/register', data)
			.then(({ data }) => {
				API.defaults.headers['Authorization'] = `Bearer ${data.token}`;
				return data;
			})
			.catch((error) => {
				console.error('Auth service error', error);
				throw error;
			});
	},
	logout: () => {},
};

export default AuthService;
