import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChats } from '../../redux/chat/actions';

import './Chat.css';

import Navbar from './components/Navbar/Navbar';

const Chat = () => {
	const dispatch = useDispatch();
	// const user = useSelector((state) => state.authReducer.user);

	useEffect(() => {
		dispatch(fetchChats())
			.then((response) => console.log(response))
			.catch((error) => console.error(error));
	}, [dispatch]);

	return (
		<Fragment>
			<Navbar />
		</Fragment>
	);
};

export default Chat;
