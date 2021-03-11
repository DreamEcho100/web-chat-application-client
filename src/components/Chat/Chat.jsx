import React, { Fragment } from 'react';
// import { useSelector } from 'react-redux';

import './Chat.css';

import Navbar from './components/Navbar/Navbar';

const Chat = () => {
	// const user = useSelector((state) => state.authReducer.user);

	return (
		<Fragment>
			<Navbar />
		</Fragment>
	);
};

export default Chat;
