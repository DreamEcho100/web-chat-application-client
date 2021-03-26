import React from 'react';

import './Message.css';

const Message = ({ user, chat, index, message }) => {
	const handleAddingZeroAtFirstOrNot = (num) => {
		return `${num}`.length === 1 ? `0${num}` : `${num}`;
	};

	const isMessageUpdated = message.createdAt === message.updated;

	const getMessageTimeAndDate = () => {
		const messageTimeAndDate = isMessageUpdated
			? new Date(message.updatedAt)
			: new Date(message.createdAt);

		let hours;
		let minutes;
		let dayOrNight;
		// let time;

		// let date;
		let day;
		let month;
		let year;

		// Get the time
		hours =
			messageTimeAndDate.getHours() -
			(messageTimeAndDate.getTimezoneOffset() * -1) / 60 +
			(new Date().getTimezoneOffset() * -1) / 60;
		if (hours > 24) {
			hours = hours % 24;
			messageTimeAndDate = new Date(messageTimeAndDate.getTime() + 86400000);
		} else if (hours < 0) {
			hours = 24 + hours;
			messageTimeAndDate = new Date(messageTimeAndDate.getTime() - 86400000);
		}
		if (hours > 12) {
			hours = hours % 12;
			dayOrNight = 'pm';
		} else {
			dayOrNight = 'am';
		}
		hours = handleAddingZeroAtFirstOrNot(hours);

		minutes = messageTimeAndDate.getMinutes();
		minutes = handleAddingZeroAtFirstOrNot(minutes);

		// time = `${hours}:${minutes}`;

		// Get the time
		day = messageTimeAndDate.getUTCDate();
		month = messageTimeAndDate.getMonth() + 1;
		year = messageTimeAndDate.getFullYear();
		// date = `${day}/${month}/${year}`;

		return { time: { hours, minutes, dayOrNight }, date: { day, month, year } };
	};

	const { time, date } = getMessageTimeAndDate();

	const determineMargin = () => {
		if (index + 1 === chat.Messages.length) {
			return;
		}

		return message.fromUserId === chat.Messages[index + 1].fromUserId
			? 'mb-5'
			: 'mb-10';
	};

	return (
		<div
			id={`chat-${message.chatId}-user-${message.fromUserId}-message-${message.id}`}
			className={`message ${determineMargin()} ${
				message.fromUserId === user.id ? 'creator' : ''
			}`}
		>
			<div
				className={message.fromUserId === user.id ? 'owner' : 'other-person'}
			>
				{message.fromUserId !== user.id ? (
					<header>
						<img
							className='message-box-avatar border-radius-circle '
							src={message.User.avatar}
							alt=''
						/>
						<h6>
							{message.User.firstName} {message.User.lastName}
						</h6>
					</header>
				) : null}{' '}
				<main>
					{message.type === 'text' ? (
						message.message.split('___IANLH___').map((message, index) => {
							if (message.trim() === '') {
								return <br key={index} />;
							}
							return <p key={index}>{message}</p>;
						})
					) : (
						<img src={message.message} alt='User upload' />
					)}
				</main>
				<footer>
					<div className='date-and-time'>
						{isMessageUpdated ? (
							<div className='updatedAt'>
								<p>Updated at:</p>
							</div>
						) : (
							<div className='createdAt'>
								<p>Created at:</p>
							</div>
						)}
						<div className='date'>
							<p>
								{date.year}
								<span className='splash'>/</span>
								{date.month}
								<span>/</span>
								{date.day}
							</p>
						</div>
						<div className='time'>
							<p>
								{`${time.hours}`}
								<span className='two-dots'>:</span>
								{`${time.minutes}${time.dayOrNight}`}
							</p>
						</div>
					</div>
				</footer>
			</div>
		</div>
	);
};

export default Message;
