import { useState, useEffect } from "react";

const fetchChats = async () => {
	try {
		const data = await fetch("http://localhost:5000/api/v1/chats");
		const res = await data.json();
		return res;
	} catch (e) {
		console.log(e);
	}
};

interface Users {
	name: string;
	email: string;
}

interface ChatData {
	_id: string;
	chatName: string;
	isGroupChat: boolean;
	users: Users[];
}

const ChatPage = () => {
	const [chats, setChats] = useState<ChatData[] | null>();
	useEffect(() => {
		fetchChats().then((results) => {
			setChats(results);
		});
	}, []);

	return (
		<>
			{chats &&
				chats.map((chat: ChatData) => (
					<p key={chat._id}>{chat.chatName}</p>
				))}
		</>
	);
};

export default ChatPage;
