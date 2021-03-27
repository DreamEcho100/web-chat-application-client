import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { paginateMessages } from '../../../../redux/chat/actions';

import './MessageBox.css';

import {
	paginateMessages,
	setANewMessageSeen,
	setMessageElementAndSenderTypingElement,
} from '../../../../redux/chat/actions';

import Message from '../Message/Message';

const MessageBox = ({ chat }) => {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.authReducer.user);
	const scrollBottom = useSelector((state) => state.chatReducer.scrollBottom);
	const senderTyping = useSelector((state) => state.chatReducer.senderTyping);
	const senderTypingElementNearlyInView = useSelector(
		(state) => state.chatReducer.senderTyping.senderTypingElementNearlyInView
	);
	const newMessage = useSelector((state) => state.chatReducer.newMessage);

	const [loading, setLoading] = useState(false);
	const [receivingAnewMessage, setReceivingAnewMessage] = useState(false);
	const [newMessageElement, setNewMessageElement] = useState(false);
	// const [
	// 	senderTypingElementNearlyInView,
	// 	setSenderTypingElementNearlyInView,
	// ] = useState(true);
	// const [scrollUp, setScrollUp] = useState(0);
	const [
		scrollPositionOnRecivingMessages,
		setScrollPositionOnRecivingMessages,
	] = useState(0);
	// const [messageOnScrollUp, setMessageOnScrollUp] = useState(true);

	const msgBoxElement = useRef();
	const senderTypingElement = useRef();

	const scrollManual = (value) => {
		msgBoxElement.current.scrollTop = value;
	};

	const showSenderTypingElement = (currentScrollPosition, scrolHeight) => {
		if (!senderTypingElement.current) {
			return;
		}

		const limit =
			senderTypingElement.current.offsetHeight +
			parseFloat(getComputedStyle(senderTypingElement.current).padding) -
			parseFloat(getComputedStyle(senderTypingElement.current).marginTop);

		if (
			(senderTyping.typing && currentScrollPosition >= scrolHeight - limit) ||
			msgBoxElement.current.scrollHeight === msgBoxElement.current.clientHeight
		) {
			if (
				!senderTypingElementNearlyInView ||
				msgBoxElement.current.scrollHeight ===
					msgBoxElement.current.clientHeight
			) {
				dispatch(setMessageElementAndSenderTypingElement(null, null, true));
			}
			// setSenderTypingElementNearlyInView(true);
		} else if (senderTypingElementNearlyInView) {
			dispatch(
				setMessageElementAndSenderTypingElement(
					msgBoxElement.current,
					senderTypingElement.current,
					false
				)
			);
			// setSenderTypingElementNearlyInView(false);
		}
	};

	const showSenderNewMessageElement = (currentScrollPosition, scrolHeight) => {
		if (!receivingAnewMessage || !newMessageElement) {
			return;
		}

		const limit =
			newMessageElement.offsetHeight +
			parseFloat(getComputedStyle(newMessageElement).padding) -
			parseFloat(getComputedStyle(newMessageElement).marginTop);

		if (
			currentScrollPosition >= scrolHeight - limit ||
			msgBoxElement.current.scrollHeight === msgBoxElement.current.clientHeight
		) {
			dispatch(setANewMessageSeen(true));
			setReceivingAnewMessage(false);
		}
	};

	const handleInfiniteScroll = (event) => {
		const previousScrolHeight =
			event.target.scrollHeight - event.target.offsetHeight;

		showSenderTypingElement(event.target.scrollTop, previousScrolHeight);
		showSenderNewMessageElement(event.target.scrollTop, previousScrolHeight);

		if (event.target.scrollTop === 0) {
			setLoading(true);
			const pagination = chat.Pagination;
			const page = typeof pagination === 'undefined' ? 1 : pagination.page;

			dispatch(paginateMessages(chat.id, parseInt(page) + 1))
				.then((response) => {
					if (response) {
						const currentScrolHeight =
							event.target.scrollHeight - event.target.offsetHeight;
						// setScrollUp(scrollUp + response);
						setScrollPositionOnRecivingMessages(
							currentScrolHeight - previousScrolHeight
						);
					} else {
						// setMessageOnScrollUp(false);
					}
					setLoading(false);
				})
				.catch((err) => {
					setLoading(false);
				});
		}
	};

	useEffect(() => {
		setTimeout(() => {
			if (msgBoxElement && msgBoxElement.current) {
				scrollManual(scrollPositionOnRecivingMessages);
			}
		}, 0);
	}, [scrollPositionOnRecivingMessages]);

	useEffect(() => {
		const previousScrolHeight =
			msgBoxElement.current.scrollHeight - msgBoxElement.current.offsetHeight;
		showSenderTypingElement(
			msgBoxElement.current.scrollTop,
			previousScrolHeight
		);
	}, [senderTyping.typing]);

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		if (msgBoxElement && msgBoxElement.current) {
	// 			scrollManual(Math.ceil(msgBoxElement.current.scrollHeight * 0.1));
	// 		}
	// 	}, 100);
	// }, [scrollUp]);

	useEffect(() => {
		setTimeout(() => {
			if (msgBoxElement && msgBoxElement.current) {
				scrollManual(msgBoxElement.current.scrollHeight);
			}
		}, 100);
	}, [scrollBottom]);

	useEffect(() => {
		setNewMessageElement(
			document.getElementById(
				`chat-${newMessage.chatId}-user-${newMessage.userId}-message-${newMessage.messageId}`
			)
		);
		setReceivingAnewMessage(true);

		showSenderNewMessageElement(
			msgBoxElement.current.scrollTop,
			msgBoxElement.current.scrollHeight - msgBoxElement.current.offsetHeight
		);
	}, [newMessage.messageId]);

	return (
		<div
			onScroll={handleInfiniteScroll}
			id='msg-box'
			ref={msgBoxElement}
			style={{ position: 'relative' }}
		>
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
						key={index /*message.id*/}
					/>
				);
			})}
			{senderTyping.typing && senderTyping.chatId === chat.id ? (
				<div
					className='message'
					ref={senderTypingElement}
					style={{ marginTop: '0.25em' }}
				>
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
