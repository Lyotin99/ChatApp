import { createContext, useContext, useState } from "react";
import {
	getAllMessagesService,
	sendMessageService,
} from "../services/MessageServices";
import { Message } from "../utils/types";

interface MessagesContextData {
	messages: Message[];
	getChatMessages: (chatId: string) => void;
	postMessage: (content: string, chatId: string) => void;
}

const MessagesContext = createContext({} as MessagesContextData);

export const useMessagesContext = () => useContext(MessagesContext);

const MessagesProvider = ({ children }: { children: React.ReactNode }) => {
	const [messages, setMessages] = useState<Message[]>([] as Message[]);

	const getChatMessages = (chatId: string) => {
		getAllMessagesService(chatId).then((res) => {
			setMessages(res.messages);
		});
	};

	const postMessage = (content: string, chatId: string) => {
		sendMessageService(chatId, content).then((res) => {
			res.message && setMessages([...messages, res.message]);
		});
	};

	return (
		<MessagesContext.Provider
			value={{ messages, getChatMessages, postMessage }}
		>
			{children}
		</MessagesContext.Provider>
	);
};

export default MessagesProvider;
