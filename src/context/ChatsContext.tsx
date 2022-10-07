import { createContext, useContext, useEffect, useState } from "react";
import {
	fetchChats,
	createChat,
	createGroupChatService,
	updateGroupChatService,
	removeGroupChatService,
} from "../services/ChatServices";
import { Chat } from "../utils/types";
import { useAuthContext } from "./AuthContext";

interface ChatContextData {
	chats: Chat[];
	loading: boolean;
	updateChatLatestMessage: (chatId: string, latestMessage: string) => void;
	createUserChat: (userId: string) => Promise<any>;
	createGroupChat: (chatId: string, users: [{ userId: string }]) => void;
	updateGroupChat: (chatId: string, newChatName: string) => void;
	removeGroupChat: (chatId: string) => void;
}

const ChatsContext = createContext({} as ChatContextData);

export const useChatContext = () => useContext(ChatsContext);

const ChatsProvider = ({ children }: { children: React.ReactNode }) => {
	const [chats, setChats] = useState<Chat[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const {
		user: { token, userId },
	} = useAuthContext();

	useEffect(() => {
		userId &&
			fetchChats(token).then((res) => {
				setChats(res.chats);
				setLoading(false);
			});
	}, [token, userId]);

	const updateChatLatestMessage = (chatId: string, latestMessage: string) => {
		setChats((oldChats) => {
			return oldChats.map((chat) => {
				if (chat._id === chatId)
					chat.latestMessage.content = latestMessage;

				return chat;
			});
		});
	};

	const createUserChat = (userId: string) => {
		const chat = createChat(userId, token)
			.then((res) => {
				const chat = chats.find((chat) => chat._id === res.chats._id);

				if (!chat) {
					setChats([res.chats, ...chats]);
				} else {
					const chatsWithoutSelectedOne = chats.filter(
						(chat) => chat._id !== res.chats._id
					);

					setChats([res.chats, ...chatsWithoutSelectedOne]);
				}

				return res.chats;
			})
			.catch((e) => console.log(e));

		return chat;
	};

	const createGroupChat = (chatName: string, users: [{ userId: string }]) => {
		const usersStringified = JSON.stringify(users);

		const chat = createGroupChatService(
			chatName,
			usersStringified,
			token
		).then((res) => {
			setChats([res.chats, ...chats]);
			return res.chats;
		});

		return chat;
	};

	const updateGroupChat = (chatId: string, newChatName: string) => {
		const chat = updateGroupChatService(chatId, newChatName, token).then(
			(res) => {
				setChats((chats) => {
					return chats.map((chat) => {
						if (chat && chat._id === chatId) {
							return (chat = res.chat);
						} else return chat;
					});
				});

				return res.chat;
			}
		);

		return chat;
	};

	const removeGroupChat = (chatId: string) => {
		removeGroupChatService(chatId, token).then((res) => {
			setChats((oldChats) => {
				return oldChats.filter((chat) => chatId !== chat._id);
			});
		});
	};

	return (
		<ChatsContext.Provider
			value={{
				chats,
				loading,
				updateChatLatestMessage,
				createGroupChat,
				createUserChat,
				removeGroupChat,
				updateGroupChat,
			}}
		>
			{children}
		</ChatsContext.Provider>
	);
};

export default ChatsProvider;
