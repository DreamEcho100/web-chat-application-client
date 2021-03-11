import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Navbar.css';

import { logout } from '../../../../store/actions/auth';
import Modal from '../../../Modal/Modal';

const Navbar = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.authReducer.user);
	const [showProfileOptions, setShowProfileOptions] = useState(false);
	const [showProfileModal, setShowProfileModal] = useState(false);

	return (
		<header id='navbar' className='card-shadow'>
			<h2 className='user-select-none'>Chat.io</h2>
			<div id='profile-menu'>
				<img
					src={user.avatar}
					alt='avatar'
					className=' cursor-pointer user-select-none'
				/>
				<p className=' cursor-pointer user-select-none'>
					{user.firstName} {user.lastName}
				</p>
				<FontAwesomeIcon
					icon='caret-down'
					className='fa-icon cursor-pointer user-select-none'
					onClick={() => setShowProfileOptions(!showProfileOptions)}
				/>

				{showProfileOptions && (
					<div id='profile-options'>
						<p
							className=' cursor-pointer user-select-none'
							onClick={() => {
								setShowProfileModal(true);
								setShowProfileOptions(false);
							}}
						>
							Update profile
						</p>
						<p
							className=' cursor-pointer user-select-none'
							onClick={() => dispatch(logout())}
						>
							Logout
						</p>
					</div>
				)}

				{showProfileModal && (
					<Modal click={() => setShowProfileModal(false)}>
						<Fragment key='header'>
							<p>Header</p>
						</Fragment>

						<Fragment key='body'>
							<p>Body</p>
						</Fragment>

						<Fragment key='footer'>
							<p>Footer</p>
						</Fragment>
					</Modal>
				)}
			</div>
		</header>
	);
};

export default Navbar;
