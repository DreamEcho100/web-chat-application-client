import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import { useDispatch } from 'react-redux';

import './Auth.css';

import { ReactComponent as RegisterImage } from '../../assests/images/register.svg';
// import AuthService from '../../services/authService';
import { register } from '../../redux/auth/actions';

const Register = ({ history }) => {
	const dispatch = useDispatch();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [gender, setGender] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const firstNameInputRef = useRef();

	const handelFormSubmition = (event) => {
		event.preventDefault();
		if (!gender) {
			return;
		}

		dispatch(
			register(
				{
					firstName,
					lastName,
					email,
					password,
					gender,
				},
				history
			)
		);

		// AuthService.register({
		// 	firstName,
		// 	lastName,
		// 	email,
		// 	password,
		// 	gender,
		// });

		// axios
		// 	.post('http://localhost:5000/register', {
		// 		firstName,
		// 		lastName,
		// 		email,
		// 		password,
		// 		gender,
		// 	})
		// 	.then((response) => response.data)
		// 	.then((data) => console.log(data))
		// 	.catch((error) => console.error('Error', error));
	};

	useEffect(() => {
		if (!firstNameInputRef.current) {
			return;
		}
		firstNameInputRef.current.focus();
	}, [firstNameInputRef.current]);

	return (
		<section id='auth-container' className='register'>
			<div id='auth-card'>
				<div>
					<div id='image-section'>
						<RegisterImage />
					</div>

					<div id='form-section'>
						<h2>Create an account</h2>

						<form className='form-theme-1' onSubmit={handelFormSubmition}>
							<div className='element-container-theme-1 form-element-theme-1'>
								<input
									className='input-theme-1 element-theme-1'
									ref={firstNameInputRef}
									onChange={(event) => setFirstName(event.target.value)}
									value={firstName}
									type='text'
									placeholder='First Name'
									required
									minLength='3'
									maxLength='64'
								/>
							</div>

							<div className='element-container-theme-1 form-element-theme-1'>
								<input
									className='input-theme-1 element-theme-1'
									onChange={(event) => setLastName(event.target.value)}
									value={lastName}
									type='text'
									placeholder='Last Name'
									required
									minLength='3'
									maxLength='64'
								/>
							</div>

							<div className='element-container-theme-1 form-element-theme-1'>
								<input
									className='input-theme-1 element-theme-1'
									onChange={(event) => setEmail(event.target.value)}
									value={email}
									type='email'
									placeholder='Email'
									required
								/>
							</div>

							<div className='element-container-theme-1 form-element-theme-1'>
								<input
									className='input-theme-1 element-theme-1'
									onChange={(event) => setPassword(event.target.value)}
									value={password}
									type='password'
									placeholder='Password'
									required
									minLength='6'
									maxLength='64'
								/>
							</div>

							<div className='element-container-theme-1 form-element-theme-1'>
								<select
									className='select-theme-1 element-theme-1'
									required
									onChange={(event) => setGender(event.target.value)}
									defaultValue='--Choose your gender.'
								>
									<option disabled>--Choose your gender.</option>
									<option value='male'>Male</option>
									<option value='female'>Female</option>
								</select>
							</div>

							<div className='element-container-theme-1 form-element-theme-1'>
								<button
									className='button-theme-1 element-theme-1'
									type='submit'
								>
									Register
								</button>
							</div>
						</form>

						<p>
							Already have an account? <Link to='/login'>Login</Link>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Register;
