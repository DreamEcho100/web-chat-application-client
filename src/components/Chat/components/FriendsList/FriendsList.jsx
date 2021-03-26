import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './FriendsList.css';

import { setCurrentChat } from '../../../../redux/chat/actions';

import Friend from '../Friend/Friend';
import Modal from '../../../Modal/Modal';
import ChatService from '../../../../services/chatService';

const FriendsList = () => {
	const dispatch = useDispatch();

	const chats = useSelector((state) => state.chatReducer.chats);
	const socket = useSelector((state) => state.chatReducer.chats);

	const [showFriendsModal, setShowFriendsModal] = useState(false);
	const [suggestions, setSuggestions] = useState([]);

	const openChat = (chat) => {
		dispatch(setCurrentChat(chat));
	};

	const searchFriends = (event) => {
		ChatService.searchUsers(event.tatrget.value).then((response) =>
			setSuggestions(response)
		);
	};

	const addNewFriend = (id) => {
		ChatService.createChat(id)
			.then((chats) => {
				socket.emit('add-friend', chats);
				setShowFriendsModal(false);
			})
			.catch((error) => console.log(error));
	};

	return (
		<div id='friends' className='shadow-light'>
			<div id='title'>
				<h3>Friends</h3>
				<button onClick={() => setShowFriendsModal(true)}>Add</button>
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
			{showFriendsModal && (
				<Modal click={() => setShowFriendsModal(false)}>
					<Fragment key='header'>
						<h3>Create new Chat</h3>
					</Fragment>
					<Fragment key='body'>
						<p>Find friends by typing their name bellow</p>
						<input
							onInput={(event) => searchFriends(event)}
							type='text'
							placeholder='Search...'
						/>
						<div id='suggestions'>
							{suggestions.map((user) => (
								<div key={user.id} className='suggestion'>
									<p>
										{user.firstName} {user.lastName}
									</p>
									<button onClick={() => addNewFriend(user.id)}>Add</button>
								</div>
							))}
						</div>
					</Fragment>
				</Modal>
			)}
		</div>
	);
};

export default FriendsList;
