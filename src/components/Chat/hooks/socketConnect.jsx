import { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import {
	onlineFriends,
	onlineFriend,
	offlineFriend,
	fetchChats,
	setSocket,
	receivedMessage,
	senderTyping,
	createChat,
	addUserToGroup,
	leaveCurrentChat,
	deleteCurrentChat,
} from '../../../redux/chat/actions';
import BACK_END_URL from '../../../services/BACK_END_URL';

const useSocket = (user, dispatch) => {
	useEffect(() => {
		dispatch(fetchChats())
			.then((response) => {
				// const socket = socketIOClient.connect(BACK_END_URL);
				const socket = socketIOClient(BACK_END_URL, {
					transports: ['websocket' /*, 'polling', 'flashsocket'*/],
				});

				dispatch(setSocket(socket));

				socket.emit('join', user);

				socket.on('typing', (sender) => {
					// dispatch
					dispatch(senderTyping(sender));
				});

				socket.on('friends', (friends) => {
					dispatch(onlineFriends(friends));
				});

				socket.on('online', (user) => {
					dispatch(onlineFriend(user));
				});

				socket.on('offline', (user) => {
					dispatch(offlineFriend(user));
				});

				socket.on('received', (message) => {
					dispatch(receivedMessage(message, user.id));
				});

				socket.on('new-chat', (chat) => {
					// console.log(chat);
					dispatch(createChat(chat));
				});

				socket.on('added-user-to-group', (group) => {
					// console.log(group);
					dispatch(addUserToGroup(group));
				});

				socket.on('remove-user-from-chat', (data) => {
					data.currentUserId = user.id;
					dispatch(leaveCurrentChat(data));
				});

				socket.on('delete-chat', (data) => {
					dispatch(deleteCurrentChat(data));
				});
			})
			.catch((error) => console.error(error));
	}, [dispatch]);
};

export default useSocket;
