const chatBaseURL = "http://localhost:5000/api/v1/chats";

export const fetchChats = async (token: string) => {
	try {
		const data = await fetch(`${chatBaseURL}`, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});
		const res = await data.json();
		return res;
	} catch (e) {
		console.log(e);
	}
};

export const createChat = async (userId: string, token: string) => {
	try {
		const req = await fetch(`${chatBaseURL}/${userId}`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});
		const res = await req.json();

		return res;
	} catch (error) {
		console.log(error);
	}
};

export const createGroupChatService = async (
	chatName: string,
	users: string,
	token: string
) => {
	try {
		const req = await fetch(`${chatBaseURL}/createGroup`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ chatName, users }),
		});
		const res = await req.json();

		return res;
	} catch (error) {
		console.log(error);
	}
};

export const updateGroupChatService = async (
	chatId: string,
	newChatName: string,
	token: string
) => {
	try {
		const req = await fetch(`${chatBaseURL}/${chatId}`, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ chatName: newChatName }),
		});

		const res = await req.json();

		return res;
	} catch (error) {
		console.log(error);
	}
};

export const removeGroupChatService = async (chatId: string, token: string) => {
	try {
		const req = await fetch(`${chatBaseURL}/${chatId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});

		const res = await req.json();

		return res;
	} catch (error) {
		console.log(error);
	}
};
