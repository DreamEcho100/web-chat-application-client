import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './MessageInput.css';

const MessageInput = ({ chat }) => {
	const user = useSelector((state) => state.authReducer.user);
	const socket = useSelector((state) => state.chatReducer.socket);

	const [message, setMessage] = useState('');
	const [image, setImage] = useState('');

	const handleMessage = (event) => {
		const value = event.target.value;
		setMessage(value);

		// Notify other users that this user is typing somthing
	};

	const handleKeyDown = (event, imageUpload) => {
		if (event.key === 'Enter') {
			return sendMessage(imageUpload);
		}
	};

	const sendMessage = (imageUpload) => {
		if (message.length === 0 && !imageUpload) {
			return;
		}

		const msg = {
			type: imageUpload ? 'image' : 'text',
			fromUser: user,
			toUserId: chat.Users.map((user) => user.id),
			chatId: chat.id,
			message: imageUpload ? image : message,
		};

		setMessage('');
		setImage('');

		// Send message with soket
		socket.emit('message', msg);
	};

	return (
		<div id='input-container'>
			<div id='message-input'>
				<input
					type='text'
					placeholder='Message...'
					onChange={(event) => handleMessage(event)}
					onKeyDown={(event) => handleKeyDown(event, false)}
				/>
				<FontAwesomeIcon icon={['far', 'smile']} className='fa-icon' />
			</div>
		</div>
	);
};

export default MessageInput;
