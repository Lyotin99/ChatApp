import { createContext, useContext, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { getAllMessagesService } from "../services/MessageServices";
import { Message } from "../utils/types";

interface MessagesContextData {
	messages: Message[];
	getChatMessages: (chatId: string) => void;
}

const MessagesContext = createContext({} as MessagesContextData);

export const useMessagesContext = () => useContext(MessagesContext);

const MessagesProvider = ({ children }: { children: React.ReactNode }) => {
	const [messages, setMessages] = useState<Message[]>([] as Message[]);
	const [loading, setLoading] = useState<boolean>(false);

	const {
		user: { token },
	} = useAuthContext();

	const getChatMessages = (chatId: string) => {
		setLoading(true);

		getAllMessagesService(chatId, token).then((res) => {
			setMessages(res.messages);
			setLoading(false);
		});
	};

	const postMessage = () => {};

	return (
		<MessagesContext.Provider value={{ messages, getChatMessages }}>
			{children}
		</MessagesContext.Provider>
	);
};

export default MessagesProvider;
