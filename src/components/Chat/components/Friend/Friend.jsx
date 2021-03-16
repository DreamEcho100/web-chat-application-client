import React from 'react';
import { useSelector } from 'react-redux';

import { userStatus } from '../../../../utils/helper';

import './Friend.css';

const Friend = ({ chat, click }) => {
	const currentChat = useSelector((state) => state.chatReducer.currentChat);
	const { firstName, lastName, avatar } = chat.Users[0];

	const isChatOpened = () => {
		if (!currentChat) {
			return '';
		}
		return currentChat.id === chat.id ? 'opened' : '';
	};

	const lastMessage = () => {
		if (chat.Messages.length === 0) {
			return '';
		}

		const message = chat.Messages[chat.Messages.length - 1];
		return message.type === 'image' ? 'image uploaded' : message.message;
	};
	return (
		<div onClick={click} className={`friend-list ${isChatOpened()}`}>
			<div>
				<img
					className='border-radius-circle'
					src={avatar}
					alt={`${firstName} ${lastName} avatar`}
				/>
				<div className='friend-info'>
					<h4>
						{firstName} {lastName}
					</h4>
					<h5>{lastMessage()} </h5>
				</div>
				<div className='friend-status'>
					<span className={`online-status ${userStatus(chat.Users[0])}`}></span>
				</div>
			</div>
		</div>
	);
};

export default Friend;
