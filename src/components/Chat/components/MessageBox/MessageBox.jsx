import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { paginateMessages } from '../../../../redux/chat/actions';

import './MessageBox.css';

import Message from '../Message/Message';

const MessageBox = ({ chat }) => {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.authReducer.user);
	const scrollBottom = useSelector((state) => state.chatReducer.scrollBottom);
	const senderTyping = useSelector((state) => state.chatReducer.senderTyping);
	const [loading, setLoading] = useState(false);
	const [scrollUp, setScrollUp] = useState(0);

	const msgBox = useRef();

	const scrollManual = (value) => {
		msgBox.current.scrollTop = value;
	};

	const handleInfiniteScroll = () => {};

	useEffect(() => {
		setTimeout(() => {
			scrollManual(msgBox.current.scrollHeight);
		}, 100);
	}, [scrollBottom]);

	return (
		<div onScroll={handleInfiniteScroll} id='msg-box' ref={msgBox}>
			{loading ? (
				<p className='loader'>
					<FontAwesomeIcon icon='spinner' className='fa-spin' />
				</p>
			) : null}
			{chat.Messages.map((message, index) => {
				return (
					<Message
						user={user}
						chat={chat}
						message={message}
						index={index}
						key={message.id}
					/>
				);
			})}
			{senderTyping &&
			senderTyping.typing &&
			senderTyping.chatId === chat.id ? (
				<div className='message'>
					<div className='other-person'>
						<p>
							{senderTyping.fromUser.firstName} {senderTyping.fromUser.lastName}
							...
						</p>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default MessageBox;
