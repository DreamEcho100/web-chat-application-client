import React, { useState, Fragment, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './FriendsList.css';

import { setCurrentChat } from '../../../../redux/chat/actions';

import Friend from '../Friend/Friend';
import Modal from '../../../Modal/Modal';
import ChatService from '../../../../services/chatService';

const FriendsList = () => {
	const dispatch = useDispatch();

	const searchInputRef = useRef();

	const chats = useSelector((state) => state.chatReducer.chats);
	const socket = useSelector((state) => state.chatReducer.socket);

	const [showFriendsModal, setShowFriendsModal] = useState(false);
	const [suggestions, setSuggestions] = useState([]);

	const openChat = (chat) => {
		dispatch(setCurrentChat(chat));
	};

	const searchFriends = (event) => {
		const value = event.target.value;
		// if (value.replace(/\s/g, '').length < 3) {
		// 	return;
		// }
		ChatService.searchUsers(value).then((response) => setSuggestions(response));
	};

	const addNewFriend = (id) => {
		ChatService.createChat(id)
			.then((chats) => {
				socket.emit('add-friend', chats);
				setShowFriendsModal(false);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		if (!searchInputRef.current) {
			return;
		}
		searchInputRef.current.focus();
	}, [searchInputRef.current]);

	return (
		<div id='friends' className='shadow-light'>
			<div id='title'>
				<h3>Friends</h3>
				<div className='button-container-theme-2'>
					<button
						className='element-theme-1 button-theme-1 border-radius-1rem'
						onClick={() => setShowFriendsModal(true)}
					>
						Add
					</button>
				</div>
			</div>

			<hr className='hr-theme-1' />

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
						<header className='search-for-friends'>
							<p className='text-align-center'>
								Find friends by typing their name bellow
							</p>
							<div className='element-container-theme-1 form-element-theme-1 margin-auto'>
								<input
									ref={searchInputRef}
									className='input-theme-1 element-theme-1'
									onInput={(event) => searchFriends(event)}
									type='text'
									placeholder='Search...'
								/>
							</div>
						</header>
						<div id='suggestions'>
							{suggestions.map((user) => (
								<div key={user.id} className='suggestion'>
									<p>
										{user.firstName} {user.lastName}
									</p>
									<div className='button-container-theme-2 form-element-theme-1'>
										<button
											className='element-theme-1 button-theme-2 border-radius--half-1rem'
											onClick={() => addNewFriend(user.id)}
										>
											Add
										</button>
									</div>
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
