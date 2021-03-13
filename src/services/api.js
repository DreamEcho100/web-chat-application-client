import axios from 'axios';
console.log(localStorage.getItem('oitahcToken'));
export default axios.create({
	baseURL: 'http://localhost:5000',
	headers: {
		Accept: 'application/json',
		Authorization: `Bearer ${localStorage.getItem('oitahcToken') || ''}`,
	},
});
