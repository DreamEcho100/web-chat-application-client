import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Navbar.css';

import { logout } from '../../../../store/actions/auth';

const Navbar = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.authReducer.user);
	const [showProfileOptions, UseShowProfileOptions] = useState(false);

	return (
		<header id='navbar' className='card-shadow'>
			<h2>Chat.io</h2>
			<div id='profile-menu'>
				<img src={user.avatar} alt='avatar' />
				<p>
					{user.firstName} {user.lastName}
				</p>
				<FontAwesomeIcon
					icon='caret-down'
					className='fa-icon'
					onClick={() => UseShowProfileOptions(!showProfileOptions)}
				/>

				{showProfileOptions && (
					<div id='profile-options'>
						<p>Update profile</p>
						<p onClick={() => dispatch(logout())}>Logout</p>
					</div>
				)}
			</div>
		</header>
	);
};

export default Navbar;
