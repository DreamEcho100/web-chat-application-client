import React, { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './ChatHeader.css';

import { userStatus } from '../../../../utils/helper';
import chatService from '../../../../services/chatService';

import Modal from '../../../Modal/Modal';

const ChatHeader = ({ chat }) => {
	const [showChatOptions, setShowChatOptions] = useState(false);
	const [showAddFriendModal, setShowAddFriendModal] = useState(false);
	const [showLeaveChatModal, setShowLeaveChatModal] = useState(false);
	const [showDeleteChatModal, setShowDeleteChatModal] = useState(false);
	const [suggestions, setSuggestions] = useState([]);

	const searchFriends = (event) => {
		return;
	};

	const addNewFriend = () => {
		return;
	};

	const leaveChat = () => {
		return;
	};

	const deleteChat = () => {
		return;
	};

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
					<div onClick={() => setShowAddFriendModal(true)}>
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
			{showAddFriendModal && (
				<Modal click={() => setShowAddFriendModal(false)}>
					<Fragment key='header'>
						<h3>Add friend to group chat</h3>
					</Fragment>

					<Fragment key='body'>
						<p>Find friends typing their name bellow</p>
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

export default ChatHeader;
