import * as requester from "./requester";

const messagesURL = "http://localhost:5000/api/v1/messages";

export const getAllMessagesService = async (chatId: string) => {
	try {
		const res = await requester.get(`${messagesURL}/${chatId}`);

		return res;
	} catch (error) {
		console.log(error);
	}
};

export const sendMessageService = async (chatId: string, content: string) => {
	try {
		const res = await requester.post(`${messagesURL}/${chatId}`, {
			content,
		});

		return res;
	} catch (error) {
		console.log(error);
	}
};
