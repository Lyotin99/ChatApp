const chatBaseURL = "http://localhost:5000/api/v1/";

export const fetchChats = async (token: string) => {
	try {
		const data = await fetch(`${chatBaseURL}chats`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const res = await data.json();
		return res;
	} catch (e) {
		console.log(e);
	}
};
