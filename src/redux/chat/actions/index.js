import ChatService from '../../../services/chatService';
import chatReducer from '../reducer';
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

export const fetchChats = () => (dispatch) => {
	return ChatService.fetchChats()
		.then((data) => {
			data.forEach((chat) => {
				chat.Users.forEach((user) => {
					user.status = 'offline';
				});
				chat.Messages.reverse();
			});

			dispatch({ type: FETCH_CHATS, payload: data });
			return data;
		})
		.catch((error) => {
			throw error;
		});
};

export const setCurrentChat = (chat) => (dispatch) => {
	dispatch({ type: SET_CURRENT_CHAT, payload: chat });
};

export const onlineFriends = (friends) => (dispatch) => {
	dispatch({ type: FRIENDS_ONLINE, payload: friends });
};

export const onlineFriend = (friend) => (dispatch) => {
	dispatch({ type: FRIEND_ONLINE, payload: friend });
};

export const offlineFriend = (friend) => (dispatch) => {
	dispatch({ type: FRIEND_OFFLINE, payload: friend });
};

export const setSocket = (socket) => (dispatch) => {
	dispatch({ type: SET_SOCKET, payload: socket });
};

export const receivedMessage = (message, userId) => (dispatch) => {
	dispatch({ type: RECEIVED_MESSAGE, payload: { message, userId } });
};
