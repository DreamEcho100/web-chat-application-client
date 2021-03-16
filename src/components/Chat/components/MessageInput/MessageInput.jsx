import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './MessageInput.css';

const MessageInput = () => {
	const [message, setMessage] = useState('');
	const [image, setImage] = useState('');

	const handleMessage = (event) => {
		const value = event.target.value;
		setMessage(value);

		// Notify other users that this user is typing somthing
	};

	const handleKeyDown = (event, imageUpload) => {
		if (event.key === 'Enter') {
			return; // sendMessage(imageUpload);
		}
	};

	const sendMessage = (imageUpload) => {
		if (message.length && !imageUpload) {
			return;
		}
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
