import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import { useDispatch } from 'react-redux';

import './Auth.css';

import { ReactComponent as RegisterImage } from '../../assests/images/register.svg';
// import AuthService from '../../services/authService';
import { register } from '../../store/actions/auth';

const Register = ({ history }) => {
	const dispatch = useDispatch();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [gender, setGender] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

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

	return (
		<section id='auth-container' className='register'>
			<div id='auth-card'>
				<div>
					<div id='image-section'>
						<RegisterImage />
					</div>

					<div id='form-section'>
						<h2>Create an account</h2>

						<form className='theme-1' onSubmit={handelFormSubmition}>
							<div className='input-field'>
								<input
									onChange={(event) => setFirstName(event.target.value)}
									value={firstName}
									type='text'
									placeholder='First Name'
									required
									minLength='3'
									maxLength='64'
								/>
							</div>

							<div className='input-field'>
								<input
									onChange={(event) => setLastName(event.target.value)}
									value={lastName}
									type='text'
									placeholder='Last Name'
									required
									minLength='3'
									maxLength='64'
								/>
							</div>

							<div className='input-field'>
								<input
									onChange={(event) => setEmail(event.target.value)}
									value={email}
									type='email'
									placeholder='Email'
									required
								/>
							</div>

							<div className='input-field'>
								<input
									onChange={(event) => setPassword(event.target.value)}
									value={password}
									type='password'
									placeholder='Password'
									required
									minLength='6'
									maxLength='64'
								/>
							</div>

							<div className='input-field'>
								<select
									required
									onChange={(event) => setGender(event.target.value)}
									defaultValue='--Choose your gender.'
								>
									<option disabled>--Choose your gender.</option>
									<option value='male'>Male</option>
									<option value='female'>Female</option>
								</select>
							</div>

							<button type='submit'>Register</button>
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
