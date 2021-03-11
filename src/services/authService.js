import API from './api';

const AuthService = {
	login: (data) => {
		return API.post('/login', data)
			.then(({ data }) => {
				setHeadersAndStorage(data);
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
				setHeadersAndStorage(data);
				return data;
			})
			.catch((error) => {
				console.error('Auth service error', error);
				throw error;
			});
	},
	logout: () => {
		API.defaults.headers['Authorization'] = ``;
		localStorage.removeItem('oitahcUser');
		localStorage.removeItem('oitahcToken');
	},
};

const setHeadersAndStorage = ({ user, token }) => {
	API.defaults.headers['Authorization'] = `Bearer ${token}`;
	localStorage.setItem('oitahcUser', JSON.stringify(user));
	localStorage.setItem('oitahcToken', JSON.stringify(token));
};

export default AuthService;
