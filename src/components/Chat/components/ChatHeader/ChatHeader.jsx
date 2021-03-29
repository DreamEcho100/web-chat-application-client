import React, { Fragment, useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

import './ChatHeader.css';

import { userStatus } from '../../../../utils/helper';
import ChatService from '../../../../services/chatService';

import Modal from '../../../Modal/Modal';

const ChatHeader = ({ chat }) => {
	const [showChatOptions, setShowChatOptions] = useState(false);
	const [showAddFriendsModal, setShowAddFriendsModal] = useState(false);
	const [showLeaveChatModal, setShowLeaveChatModal] = useState(false);
	const [showDeleteChatModal, setShowDeleteChatModal] = useState(false);
	const [suggestions, setSuggestions] = useState([]);

	const searchInputRef = useRef();

	const socket = useSelector((state) => state.chatReducer.socket);

	const searchFriends = (event) => {
		const value = event.target.value;
		// if (value.replace(/\s/g, '').length < 3) {
		// 	return;
		// }
		ChatService.searchUsers(value).then((response) => setSuggestions(response));
	};

	const addNewFriend = (id) => {
		ChatService.addFriendToGroupChat(id, chat.id)
			.then((data) => {
				socket.emit('add-user-to-group', data);
				setShowAddFriendsModal(false);
			})
			.catch((error) => console.log(error));
	};

	const leaveChat = () => {
		return;
	};

	const deleteChat = () => {
		return;
	};

	useEffect(() => {
		if (!searchInputRef.current) {
			return;
		}
		searchInputRef.current.focus();
	}, [searchInputRef.current]);

	console.log(chat.type);

	return (
		<div id='chat-header-wapper'>
			<div id='chatter'>
				{chat.Users.map((user) => (
					<div className='chatter-info' key={user.id}>
						<h3>
							{user.firstName} {user.lastName}
						</h3>
						<div className='chatter-status'>
							<span className={`online-status ${userStatus(user)}`}></span>
						</div>
					</div>
				))}
			</div>
			<FontAwesomeIcon
				onClick={() => setShowChatOptions(!showChatOptions)}
				icon={['fas', 'ellipsis-v']}
				className='fa-icon cursor-pointer'
			/>
			<hr className='hr-theme-1' />
			{showChatOptions ? (
				<div id='settings'>
					<div onClick={() => setShowAddFriendsModal(true)}>
						<FontAwesomeIcon icon={['fas', 'user-plus']} className='fa-icon' />
						<p>Add user to chat</p>
					</div>

					{chat.type === 'group' ? (
						<div onClick={() => leaveChat()}>
							<FontAwesomeIcon
								icon={['fas', 'sign-out-alt']}
								className='fa-icon'
							/>
							<p>Leave chat</p>
						</div>
					) : null}

					{chat.type === 'dual' ? (
						<div onClick={() => deleteChat()}>
							<FontAwesomeIcon icon={['fas', 'trash']} className='fa-icon' />
							<p>Delete chat</p>
						</div>
					) : null}
				</div>
			) : null}
			{showAddFriendsModal && (
				<Modal
					className='search-friends-modal'
					click={() => setShowAddFriendsModal(false)}
				>
					<Fragment key='header'>
						<h3>Add friend to group chat</h3>
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
						<div className='suggestions'>
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

export default ChatHeader;
