import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useSocket from './hooks/socketConnect';

import { fetchChats } from '../../redux/chat/actions';

import './Chat.css';

import Navbar from './components/Navbar/Navbar';
import FriendsList from './components/FriendsList/FriendsList';
import Messenger from './components/Messenger/Messenger';

import './Chat.css';

const Chat = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.authReducer.user);

	useSocket(user, dispatch);

	// useEffect(() => {
	// 	dispatch(fetchChats())
	// 		.catch((error) => console.error(error));
	// }, [dispatch]);

	return (
		<section id="chat-section">
			<Navbar />
			<div id='chat-wrap'>
				<FriendsList />
				<Messenger />
			</div>
		</section>
	);
};

export default Chat;
