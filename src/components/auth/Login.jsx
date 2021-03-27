import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import { useDispatch } from 'react-redux';

import './Auth.css';

import { ReactComponent as LoginImage } from '../../assests/images/login.svg';
// import AuthService from '../../services/authService';
import { login } from '../../redux/auth/actions';

const Login = ({ history }) => {
	const dispatch = useDispatch();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const emailInputRef = useRef();

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

	useEffect(() => {
		if (!emailInputRef.current) {
			return;
		}
		emailInputRef.current.focus();
	}, [emailInputRef.current]);

	return (
		<section id='auth-container' className='login'>
			<div id='auth-card'>
				<div>
					<div id='image-section'>
						<LoginImage />
					</div>

					<div id='form-section'>
						<h2>Welcome back</h2>

						<form className='form-theme-1' onSubmit={handelFormSubmition}>
							<div className='element-container-theme-1 form-element-theme-1'>
								<input
									className='input-theme-1 element-theme-1'
									ref={emailInputRef}
									type='email'
									placeholder='Email'
									required
									value={email}
									onChange={(event) => {
										setEmail(event.target.value);
									}}
								/>
							</div>

							<div className='element-container-theme-1 form-element-theme-1'>
								<input
									className='input-theme-1 element-theme-1'
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

							<div className='element-container-theme-1 form-element-theme-1'>
								<button
									className='button-theme-1 element-theme-1'
									type='submit'
								>
									Login
								</button>
							</div>
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
