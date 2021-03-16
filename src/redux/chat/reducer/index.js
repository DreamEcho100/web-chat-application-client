import {
	FETCH_CHATS,
	SET_CURRENT_CHAT,
	FRIENDS_ONLINE,
	FRIEND_ONLINE,
	FRIEND_OFFLINE,
	SET_SOCKET,
	RECEIVED_MESSAGE,
	SENDER_TYPING,
	PAGINATE_MESSAGES,
	INCREMENT_SCROLL,
	CREATE_CHAT,
	ADD_USER_TO_GROUP,
	LEAVE_CURRENT_CHAT,
	DELETE_CURRENT_CHAT,
} from '../types';

const initialState = {
	chats: [],
	currentChat: [],
	sokets: [],
	newMessage: { chatId: null, seen: null },
	scrollBottom: 0,
	sendingTyping: { typing: false },
};

const chatReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case FETCH_CHATS:
			return {
				...state,
				chats: payload,
			};
			// eslint-disable-next-line no-unreachable
			break;

		case SET_CURRENT_CHAT:
			return {
				...state,
				currentChat: payload,
			};
			// eslint-disable-next-line no-unreachable
			break;

		default:
			return state;
			// eslint-disable-next-line no-unreachable
			break;
	}
};

export default chatReducer;
