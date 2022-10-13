import * as requester from "./requester";

const chatBaseURL = "http://localhost:5000/api/v1/chats";

export const fetchChats = async (token: string) => {
	try {
		const res = await requester.get(chatBaseURL, "", token);

		return res;
	} catch (error) {
		console.log(error);
	}
};

export const createChat = async (userId: string) => {
	try {
		const res = await requester.post(`${chatBaseURL}/${userId}`);

		return res;
	} catch (error) {
		console.log(error);
	}
};

export const createGroupChatService = async (
	chatName: string,
	users: string
) => {
	try {
		const res = await requester.post(`${chatBaseURL}/createGroup`, {
			chatName,
			users,
		});

		return res;
	} catch (error) {
		console.log(error);
	}
};

export const updateGroupChatService = async (
	chatId: string,
	newChatName: string
) => {
	try {
		const res = await requester.patch(`${chatBaseURL}/${chatId}`, {
			chatName: newChatName,
		});

		return res;
	} catch (error) {
		console.log(error);
	}
};

export const removeGroupChatService = async (chatId: string, token: string) => {
	try {
		const res = await requester.remove(`${chatBaseURL}/${chatId}`);

		return res;
	} catch (error) {
		console.log(error);
	}
};
