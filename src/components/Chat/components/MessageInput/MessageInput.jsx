import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Picker } from 'emoji-mart/dist-modern/index.js';

import 'emoji-mart/css/emoji-mart.css';
import './MessageInput.css';

import ChatService from '../../../../services/chatService';
import { incrementScroll } from '../../../../redux/chat/actions';

const MessageInput = ({ chat }) => {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.authReducer.user);
	const socket = useSelector((state) => state.chatReducer.socket);
	const senderTyping = useSelector((state) => state.chatReducer.senderTyping);
	const newMessage = useSelector((state) => state.chatReducer.newMessage);

	const fileUpload = useRef();
	const msgInput = useRef();

	const [message, setMessage] = useState('');
	const [image, setImage] = useState('');
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [selectingEmojiOnEmptyText, setSelectingEmojiOnEmptyText] = useState(
		false
	);

	const notifuOthersOnTyping = (message) => {
		// Notify other users that this user is typing somthing
		const receiver = {
			chatId: chat.id,
			fromUser: user,
			toUserId: chat.Users.map((user) => user.id),
		};

		if (message.trim().length === 1 || selectingEmojiOnEmptyText) {
			receiver.typing = true;
			socket.emit('typing', receiver);
		} else if (message.trim().length === 0) {
			receiver.typing = false;
			socket.emit('typing', receiver);
		}
	};

	const handleMessage = (event) => {
		const value = event.target.value;
		if (value.trim().length === 0) {
			setMessage('');
		} else {
			setMessage(value);
		}
		notifuOthersOnTyping(value);
	};

	const handleKeyDown = (event, imageUpload) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			sendMessage(imageUpload);
			notifuOthersOnTyping(message);
			return;
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
			message: imageUpload
				? imageUpload
				: message.replace(/\n/g, '___IANLH___'),
		};

		setMessage('');
		setImage('');

		// Send message with socket
		socket.emit('message', msg);
	};

	const handleImageUpload = () => {
		const formData = new FormData();
		formData.append('id', chat.id);
		formData.append('image', image);

		// Chat service
		ChatService.uploadImage(formData)
			.then((image) => {
				sendMessage(image);
			})
			.catch((error) => console.error(error));
	};

	const selectEmoji = async (emoji) => {
		const startPosition = msgInput.current.selectionStart;
		const endPosition = msgInput.current.selectionEnd;
		const emojiLength = emoji.native.length;
		const value = msgInput.current.value;
		if (!/[\S]+/g.test(message)) {
			await setSelectingEmojiOnEmptyText(true);
		}
		setMessage(
			value.substring(0, startPosition) +
				emoji.native +
				value.substring(endPosition, value.length)
		);
		msgInput.current.focus();
		msgInput.current.selectionEnd = endPosition + emojiLength;

		notifuOthersOnTyping(message);
		if (selectingEmojiOnEmptyText) {
			setSelectingEmojiOnEmptyText(false);
		}
	};

	const showNewMessage = () => {
		dispatch(incrementScroll());
	};

	return (
		<div id='input-container'>
			<div id='image-upload-container'>
				<div className='image-upload'>
					{image.name ? (
						<div className='image-details'>
							<p>{image.name}</p>
							<div className='icons-holder'>
								<FontAwesomeIcon
									onClick={handleImageUpload}
									icon='upload'
									className='fa-icon cursor-pointer'
								/>
								<FontAwesomeIcon
									onClick={() => setImage('')}
									icon='times'
									className='fa-icon cursor-pointer'
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
						onClick={() => setShowEmojiPicker(!showEmojiPicker)}
						icon={['far', 'smile']}
						className='fa-icon'
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

			{showEmojiPicker ? (
				<Picker
					className='emoji-picker-container'
					title='Pick your emoji...'
					emoji='point_up'
					style={{
						position: 'absolute',
						zIndex: '10',
						width: '35.3rem',
						bottom: '5rem',
						right: '2rem',
						maxWidth: '75vw',
					}}
					onSelect={selectEmoji}
				/>
			) : null}

			<div className='notifications'>
				{senderTyping.typing &&
				senderTyping.chatId === chat.id &&
				senderTyping.msgBoxElement &&
				!senderTyping.senderTypingElementNearlyInView ? (
					<div className='senderTyping cursor-pointer'>
						<p>
							{senderTyping.fromUser.firstName} {senderTyping.fromUser.lastName}{' '}
							typing ...
						</p>
					</div>
				) : null}
				{newMessage.seen === false && chat.id === newMessage.chatId ? (
					<div
						className='message-notification cursor-pointer'
						onClick={showNewMessage}
					>
						<FontAwesomeIcon icon='bell' className='fa-icon' />
						<p>New message!</p>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default MessageInput;
