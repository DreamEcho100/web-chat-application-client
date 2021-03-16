import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './FriendsList.css';

import { setCurrentChat } from '../../../../redux/chat/actions';

import Friend from '../Friend/Friend';

const FriendsList = () => {
	const dispatch = useDispatch();
	const chats = useSelector((state) => state.chatReducer.chats);

	const openChat = (chat) => {
		dispatch(setCurrentChat(chat));
	};

	return (
		<div id='friends' className='shadow-light'>
			<div id='title'>
				<h3>Friends</h3>
				<button>Add</button>
			</div>

			<hr />

			<div id='friends-box'>
				{chats.length > 0 ? (
					chats.map((chat) => {
						return (
							<Friend click={() => openChat(chat)} chat={chat} key={chat.id} />
						);
					})
				) : (
					<p id='no-chat'>No friends added</p>
				)}
			</div>
		</div>
	);
};

export default FriendsList;
