import { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import BACK_END_URL from '../../../services/BACK_END_URL';

const useSocket = (user, dispatch) => {
	useEffect(() => {
		// const socket = socketIOClient.connect(BACK_END_URL);
		const socket = socketIOClient(BACK_END_URL, {
			transports: ['websocket' /*, 'polling', 'flashsocket'*/],
		});

		socket.emit('join', user);

		socket.on('typing', (user) => {
			console.log('Event', user);
		});
	}, [dispatch]);
};

export default useSocket;
