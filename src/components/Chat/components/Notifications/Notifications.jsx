import React from 'react';
import { useSelector } from 'react-redux';

import './Notifications.css';

const Notifications = () => {
	const notifications = useSelector(
		(state) => state.chatReducer.mainNotifacations
	);

	console.log(notifications);

	return (
		<div className='main-popup-notifications'>
			{notifications.map((notification, index) => {
				return (
					<div key={index} className='notification'>
						<h6>{notification.type}</h6>
						<p>{notification.message}</p>
					</div>
				);
			})}
		</div>
	);
};

export default Notifications;
