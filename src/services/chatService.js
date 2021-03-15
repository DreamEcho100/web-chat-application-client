import API from './api';

const ChatService = {
	fetchChats: () => {
		return API.get('/chats')
			.then(({ data }) => {
				return data;
			})
			.catch((error) => {
				throw error;
			});
	},

	paginateMessages: (id, page) => {
		return API.post('/chats/messages', {
			params: {
				id,
				page,
			},
		})
			.then(({ data }) => {
				return data;
			})
			.catch((error) => {
				throw error;
			});
	},

	createChat: (partnerId) => {
		return API.post(`/chats/create/${partnerId}`)
			.then(({ data }) => {
				return data;
			})
			.catch((error) => {
				throw error;
			});
	},

	deleteCurrentChat: (chatId) => {
		return API.delete(`/chats/${chatId}`)
			.then(({ data }) => {
				return data;
			})
			.catch((error) => {
				throw error;
			});
	},
};

export default ChatService;
