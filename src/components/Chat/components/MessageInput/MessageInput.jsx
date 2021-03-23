import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './MessageInput.css';
import { Picker } from 'emoji-mart';
import ChatService from '../../../../services/chatService';

const MessageInput = ({ chat }) => {
	const user = useSelector((state) => state.authReducer.user);
	const socket = useSelector((state) => state.chatReducer.socket);

	const fileUpload = useRef();
	const msgInput = useRef();

	const [message, setMessage] = useState('');
	const [image, setImage] = useState('');
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [showNewMessageNotification, setShowNewMessageNotification] = useState(
		false
	);

	const handleMessage = (event) => {
		const value = event.target.value;
		setMessage(value);

		// Notify other users that this user is typing somthing
	};

	const handleKeyDown = (event, imageUpload) => {
		if (event.key === 'Enter' && !event.shiftKey) {
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
			message: imageUpload ? imageUpload : message,
		};

		setMessage('');
		setImage('');

		// Send message with soket
		socket.emit('message', msg);
	};

	const handleImageUpload = () => {
		const formData = new FormData();
		formData.append('id', chat.id);
		formData.append('image', image);

		// Chat service
		ChatService.uploadImage(formData)
			.then((image) => {
				console.log(image);
				sendMessage(image);
			})
			.catch((error) => console.error(error));
	};

	const selectEmoji = () => {};

	const showNewMessage = () => {};

	return (
		<div id='input-container'>
			<div id='image-upload-container'>
				<div>
					{false ? (
						<div className='message-notification' onClick={showNewMessage}>
							<FontAwesomeIcon icon='bell' className='fa-icon' />
							<p>New message!</p>
						</div>
					) : null}
				</div>

				<div className='image-upload'>
					{image.name ? (
						<div className='image-details'>
							<p>{image.name}</p>
							<div className='icons-holder'>
								<FontAwesomeIcon
									onClick={handleImageUpload}
									icon='upload'
									className='fa-icon'
								/>
								<FontAwesomeIcon
									onClick={() => setImage('')}
									icon='times'
									className='fa-icon'
								/>
							</div>
						</div>
					) : null}
				</div>
			</div>

			<div id='message-input'>
				<textarea
					type='text'
					placeholder='Message...'
					ref={msgInput}
					value={message}
					onChange={(event) => handleMessage(event)}
					onKeyDown={(event) => handleKeyDown(event, false)}
				/>
				<div className='icons-holder'>
					<FontAwesomeIcon
						icon={['far', 'smile']}
						className='fa-icon fa-icon-2'
					/>
					<FontAwesomeIcon
						onClick={() => fileUpload.current.click()}
						icon={['far', 'image']}
						className='fa-icon'
					/>
				</div>
			</div>

			<input
				id='chat-image'
				ref={fileUpload}
				type='file'
				onChange={(event) => setImage(event.target.files[0])}
			/>

			{false ? (
				<Picker
					title='Pick your emoji...'
					emoji='point_up'
					style={{ position: 'absolute', bottom: '2rem', right: '2rem' }}
					onSelect={selectEmoji}
				/>
			) : null}
		</div>
	);
};

export default MessageInput;
