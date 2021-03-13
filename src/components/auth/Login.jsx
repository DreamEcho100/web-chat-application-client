import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import { useDispatch } from 'react-redux';

import './Auth.css';

import { ReactComponent as LoginImage } from '../../assests/images/login.svg';
// import AuthService from '../../services/authService';
import { login } from '../../store/actions/auth';

const Login = ({ history }) => {
	const dispatch = useDispatch();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handelFormSubmition = (event) => {
		event.preventDefault();

		dispatch(login({ email, password }, history));
		// AuthService.login({ email, password });

		// axios
		// 	.post('http://localhost:5000/login', { email, password })
		// 	.then((response) => response.data)
		// 	.then((data) => console.log(data))
		// 	.catch((error) => console.error('Error', error));
	};

	return (
		<section id='auth-container' className='login'>
			<div id='auth-card'>
				<div>
					<div id='image-section'>
						<LoginImage />
					</div>

					<div id='form-section'>
						<h2>Welcome back</h2>

						<form className='theme-1' onSubmit={handelFormSubmition}>
							<div className='input-field'>
								<input
									type='email'
									placeholder='Email'
									required
									value={email}
									onChange={(event) => {
										setEmail(event.target.value);
									}}
								/>
							</div>

							<div className='input-field'>
								<input
									type='password'
									placeholder='Password'
									required
									minLength='6'
									maxLength='64'
									value={password}
									onChange={(event) => {
										setPassword(event.target.value);
									}}
								/>
							</div>

							<button type='submit'>Login</button>
						</form>

						<p>
							Don't have an account? <Link to='/register'>Register</Link>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Login;
