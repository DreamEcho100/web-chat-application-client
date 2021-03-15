import React from 'react';

import './Message.css';

const Message = ({ user, chat, index, message }) => {
	const determineMargin = () => {
		if (index + 1 === chat.Messages.length) {
			return;
		}

		return message.fromUserId === chat.Messages[index + 1].fromUserId
			? 'mb-5'
			: 'mb-10';
	};

	return (
		<div
			className={`message ${determineMargin()} ${
				message.fromUserId === user.id ? 'owner' : 'other-person'
			}`}
		>
			<div
				className={message.fromUserId === user.id ? 'owner' : 'other-person'}
			>
				{message.fromUserId !== user.id ? (
					<div className='info'>
						<img
							className='message-box-avatar'
							src={message.User.avatar}
							alt=''
						/>
						<h6>
							{message.User.firstName} {message.User.lastName}
						</h6>
					</div>
				) : null}{' '}
				{message.type === 'text' ? (
					<p>{message.message}</p>
				) : (
					<img src={message.message} alt='User upload' />
				)}
			</div>
		</div>
	);
};

export default Message;
