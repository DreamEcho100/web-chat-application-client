import React from 'react';
import { useSelector } from 'react-redux';

const Chat = () => {
	const user = useSelector((state) => state.authReducer.user);

	return (
		<div>
			<h1>Chat</h1>
			<p>
				Welcome {user.firstName} {user.lastName}
			</p>
		</div>
	);
};

export default Chat;
