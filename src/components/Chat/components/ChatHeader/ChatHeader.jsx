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
	const [chatType, setChatType] = useState(chat.type);
	const [suggestions, setSuggestions] = useState([]);

	const searchInputRef = useRef();

	const socket = useSelector((state) => state.chatReducer.socket);
	const user = useSelector((state) => state.authReducer.user);

	let searchFriendsSetTimeoutId;

	const searchFriends = (event) => {
		const value = event.target.value;
		if (!(value.replace(/\s/g, '').length > 0)) {
			return;
		}
		clearTimeout(searchFriendsSetTimeoutId);
		searchFriendsSetTimeoutId = setTimeout(() => {
			// if (value.replace(/\s/g, '').length < 3) {
			// 	return;
			// }
			ChatService.searchUsers(value).then((response) => {
				const availableUsers = chat.Users.map((user) => {
					return user.id;
				});
				const responseFiltered = response.filter((user) => {
					return !availableUsers.includes(user.id);
				});
				return setSuggestions(responseFiltered);
			});
		}, 1000);
	};
	// const searchFriends = (event) => {
	// 	const value = event.target.value;
	// 	// if (value.replace(/\s/g, '').length < 3) {
	// 	// 	return;
	// 	// }
	// 	ChatService.searchUsers(value).then((response) => {
	// 		const availableUsers = chat.Users.map((user) => {
	// 			return user.id;
	// 		});
	// 		const responseFiltered = response.filter((user) => {
	// 			return !availableUsers.includes(user.id);
	// 		});
	// 		return setSuggestions(responseFiltered);
	// 	});
	// };

	const addNewFriend = (id) => {
		ChatService.addFriendToGroupChat(id, chat.id)
			.then((data) => {
				socket.emit('add-user-to-group', data);
				setSuggestions(
					suggestions.filter((user) => {
						return user.id !== id;
					})
				);
				setChatType(data.chat.type);
				setShowAddFriendsModal(false);
			})
			.catch((error) => console.error(error));
	};

	const leaveChat = () => {
		ChatService.leaveCurrentChat(chat.id)
			.then((data) => {
				socket.emit('leave-current-chat', data);
				setShowAddFriendsModal(false);
				setShowChatOptions(false);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const deleteChat = () => {
		ChatService.deleteCurrentChat(chat.id)
			.then((data) => {
				socket.emit('delete-chat', data);
				setChatType(chat.type);
				setShowChatOptions(false);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const requestVideoCall = () => {
		// if (chat.type !== 'dual') {
		// 	return;
		// }
		const data = {
			type: 'requesting-a-dual-video-call',
			message: `Your friend ${user.firstName} ${user.lastName} is requesting a video call.`,
			chatId: chat.id,
			fromUserId: user.id,
			toUsersId: chat.Users.map((user) => {
				return user.status === 'online';
			})
				? chat.Users.map((user) => {
						if (user.status === 'online') {
							return user.id;
						}
				  })
				: [],
			chatType: chat.type,
		};
		console.log(data);
		socket.emit('requesting-a-dual-video-call', data);
	};

	useEffect(() => {
		if (!searchInputRef.current) {
			return;
		}
		searchInputRef.current.focus();
	}, [searchInputRef.current]);

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
				<div className='settings-menu-theme-2'>
					<div
						className='settings-menu-item-theme-1'
						onClick={() => {
							setShowAddFriendsModal(true);
							setTimeout(() => {
								if (!searchInputRef.current) {
									return;
								}
								searchInputRef.current.focus();
							}, 100);
						}}
					>
						<FontAwesomeIcon icon={['fas', 'user-plus']} className='fa-icon' />
						<p className='cursor-pointer user-select-none settings-menu-item-title-theme-1'>
							Add user to chat
						</p>
					</div>

					{chatType === 'group' ? (
						<div
							className='settings-menu-item-theme-1'
							onClick={() => leaveChat()}
						>
							<FontAwesomeIcon
								icon={['fas', 'sign-out-alt']}
								className='fa-icon'
							/>
							<p className='cursor-pointer user-select-none settings-menu-item-title-theme-1'>
								Leave chat
							</p>
						</div>
					) : null}

					{chatType === 'dual' ? (
						<div
							className='settings-menu-item-theme-1'
							onClick={() => deleteChat()}
						>
							<FontAwesomeIcon icon={['fas', 'trash']} className='fa-icon' />
							<p className='cursor-pointer user-select-none settings-menu-item-title-theme-1'>
								Delete chat
							</p>
						</div>
					) : null}
					{chat.type === 'dual' ? (
						<div
							className='settings-menu-item-theme-1'
							onClick={() => requestVideoCall()}
						>
							<FontAwesomeIcon
								icon={['fas', 'user-plus']}
								className='fa-icon'
							/>
							<p className='cursor-pointer user-select-none settings-menu-item-title-theme-1'>
								Video Call
							</p>
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
						<h3 className='user-select-none'>Add friend to group chat</h3>
					</Fragment>

					<Fragment key='body'>
						<header className='search-for-friends user-select-none'>
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
