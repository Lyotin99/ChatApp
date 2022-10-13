import { createContext, useContext, useState } from "react";
import {
	getAllMessagesService,
	sendMessageService,
} from "../services/MessageServices";
import { Message } from "../utils/types";

interface MessagesContextData {
	messages: Message[];
	getChatMessages: (chatId: string) => Promise<any>;
	postMessage: (content: string, chatId: string) => Promise<any>;
	addMessageToChat: (message: Message) => void;
}

const MessagesContext = createContext({} as MessagesContextData);

export const useMessagesContext = () => useContext(MessagesContext);

const MessagesProvider = ({ children }: { children: React.ReactNode }) => {
	const [messages, setMessages] = useState<Message[]>([] as Message[]);

	const getChatMessages = (chatId: string) => {
		const chat = getAllMessagesService(chatId).then((res) => {
			setMessages(res.messages);
		});

		return chat;
	};

	const addMessageToChat = (message: Message) => {
		setMessages([...messages, message]);
	};

	const postMessage = (content: string, chatId: string) => {
		const message = sendMessageService(chatId, content).then((res) => {
			res.message && setMessages([...messages, res.message]);

			return res;
		});

		return message;
	};

	return (
		<MessagesContext.Provider
			value={{ messages, getChatMessages, postMessage, addMessageToChat }}
		>
			{children}
		</MessagesContext.Provider>
	);
};

export default MessagesProvider;
