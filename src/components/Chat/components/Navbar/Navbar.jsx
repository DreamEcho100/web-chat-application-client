import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Navbar.css';

import { logout, updateProfile } from '../../../../redux/auth/actions';
import Modal from '../../../Modal/Modal';
import Notifications from '../Notifications/Notifications';

const Navbar = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.authReducer.user);
	const [showProfileOptions, setShowProfileOptions] = useState(false);
	const [showProfileModal, setShowProfileModal] = useState(false);

	const [firstName, setFirstName] = useState(user.firstName);
	const [lastName, setLastName] = useState(user.lastName);
	const [email, setEmail] = useState(user.email);
	const [gender, setGender] = useState(user.gender);
	const [password, setPassword] = useState('');
	const [avatar, setAvatar] = useState('');

	const submitForm = (event) => {
		event.preventDefault();
		if (firstName === '' || lastName === '' || email === '' || gender === '') {
			return;
		}

		const form = { firstName, lastName, email, gender, avatar };
		if (password.length > 0) {
			form.password = password;
		}
		const formData = new FormData();

		for (const key in form) {
			formData.append(key, form[key]);
		}
		/*
		for (var key of formData.entries()) {
			console.log(key[0] + ', ' + key[1]);
		}
		*/

		dispatch(updateProfile(formData)).then(() => {
			setShowProfileModal(false);
			setPassword('');
		});
	};

	return (
		<header
			style={{ position: 'relative' }}
			id='navbar'
			className='card-shadow'
		>
			{/*<Notifications />*/}
			<h2 className='user-select-none'>Chat.io</h2>
			<div id='profile-menu'>
				<img
					src={user.avatar}
					alt='avatar'
					className='cursor-pointer user-select-none'
				/>
				<p className='cursor-pointer user-select-none'>
					{user.firstName} {user.lastName}
				</p>
				<FontAwesomeIcon
					icon='caret-down'
					className='fa-icon cursor-pointer user-select-none'
					onClick={() => setShowProfileOptions(!showProfileOptions)}
				/>

				{showProfileOptions && (
					<div className='settings-menu-theme-1'>
						<div className='settings-menu-item-theme-1'>
							<p
								className='cursor-pointer user-select-none settings-menu-item-title-theme-1'
								onClick={() => {
									setShowProfileModal(true);
									setShowProfileOptions(false);
								}}
							>
								Update profile
							</p>
						</div>
						<div className='settings-menu-item-theme-1'>
							<p
								className='cursor-pointer user-select-none settings-menu-item-title-theme-1'
								onClick={() => dispatch(logout())}
							>
								Logout
							</p>
						</div>
					</div>
				)}

				{showProfileModal && (
					<Modal click={() => setShowProfileModal(false)}>
						<Fragment key='header'>
							<h3 className='user-select-none'>Update profile</h3>
						</Fragment>

						<Fragment key='body'>
							<form className='form-theme-1'>
								<div className='element-container-theme-1 form-element-theme-1'>
									<input
										className=' element-theme-1 input-theme-1'
										onChange={(event) => setFirstName(event.target.value)}
										value={firstName}
										required='required'
										type='text'
										placeholder='First name'
										minLength='3'
										maxLength='64'
									/>
								</div>

								<div className='element-container-theme-1 form-element-theme-1'>
									<input
										className=' element-theme-1 input-theme-1'
										onChange={(event) => setLastName(event.target.value)}
										value={lastName}
										required='required'
										type='text'
										placeholder='Last name'
										minLength='3'
										maxLength='64'
									/>
								</div>

								<div className='element-container-theme-1 form-element-theme-1'>
									<input
										className=' element-theme-1 input-theme-1'
										onChange={(event) => setEmail(event.target.value)}
										value={email}
										required='required'
										type='email'
										placeholder='Email'
									/>
								</div>

								<div className='element-container-theme-1 form-element-theme-1'>
									<input
										className=' element-theme-1 input-theme-1'
										onChange={(event) => setPassword(event.target.value)}
										value={password}
										required='required'
										type='password'
										placeholder='Password'
										minLength='6'
										maxLength='64'
									/>
								</div>

								<div className='element-container-theme-1 form-element-theme-1'>
									<select
										className=' element-theme-1 select-theme-1'
										onChange={(event) => setGender(event.target.value)}
										value={gender}
										required='required'
									>
										<option disabled>--Choose your gender.</option>
										<option value='male'>Male</option>
										<option value='female'>Female</option>
									</select>
								</div>

								<div className='element-container-theme-1 form-element-theme-1'>
									<input
										className='cursor-pointer element-theme-1 input-theme-1'
										onChange={(event) => setAvatar(event.target.files[0])}
										type='file'
									/>
								</div>
							</form>
						</Fragment>

						<Fragment key='footer'>
							<div className='button-container-theme-1 form-element-theme-1'>
								<button
									className='element-theme-1 button-theme-2 border-radius-1rem'
									onClick={submitForm}
								>
									Update
								</button>
							</div>
						</Fragment>
					</Modal>
				)}
			</div>
		</header>
	);
};

export default Navbar;
