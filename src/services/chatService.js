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

	uploadImage: (data) => {
		const headers = {
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		};
		return API.post('/chats/upload-image', data, headers)
			.then(({ data }) => {
				return data.url;
			})
			.catch((error) => {
				throw error;
			});
	},

	paginateMessages: (id, page) => {
		return API.get('/chats/messages', {
			params: {
				id,
				page,
			},
		})
			.then(({ data }) => {
				console.log(data);
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
