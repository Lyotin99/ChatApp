const messagesURL = "http://localhost:5000/api/v1/messages";

export const getAllMessagesService = async (chatId: string, token: string) => {
	try {
		const req = await fetch(`${messagesURL}/${chatId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const res = await req.json();

		return res;
	} catch (error) {
		console.log(error);
	}
};

export const sendMessageService = () => {
	try {
	} catch (error) {}
};
