import { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import {
	onlineFriends,
	onlineFriend,
	offlineFriend,
	fetchChats,
	setSocket,
	receivedMessage,
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

				socket.on('typing', (user) => {
					console.log('Event', user);
				});

				socket.on('friends', (friends) => {
					console.log('Event', friends);
					dispatch(onlineFriends(friends));
				});

				socket.on('online', (user) => {
					console.log('Event', user);
					dispatch(onlineFriend(user));
				});

				socket.on('offline', (user) => {
					console.log('Event', user);
					dispatch(offlineFriend(user));
				});

				socket.on('received', (message) => {
					dispatch(receivedMessage(message, user.id));
				});
			})
			.catch((error) => console.error(error));
	}, [dispatch]);
};

export default useSocket;
