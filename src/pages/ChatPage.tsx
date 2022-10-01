import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { fetchChats } from "../services/ChatServices";

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
	const {
		user: { token },
	} = useAuthContext();

	useEffect(() => {
		fetchChats(token).then((results) => {
			setChats(results);
		});
	}, [token]);

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
