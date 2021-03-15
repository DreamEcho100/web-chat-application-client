import React from 'react';
import { useSelector } from 'react-redux';

import './Messenger.css';

import ChatHeader from '../ChatHeader/ChatHeader';
import MessageBox from '../MessageBox/MessageBox';
import MessageInput from '../MessageInput/MessageInput';

const Messenger = () => {
	const chat = useSelector((state) => state.chatReducer.currentChat);

	const activeChat = () => {
		if (!chat) {
			return false;
		}
		return Object.keys(chat).length > 0;
	};

	return (
		<div id='messenger' className='shadow-light'>
			{activeChat() ? (
				<div id='messenger-wrap'>
					<ChatHeader chat={chat} />
					<hr />
					<MessageBox chat={chat} />
					<MessageInput chat={chat} />
				</div>
			) : (
				<p>No active chat</p>
			)}
		</div>
	);
};

export default Messenger;
