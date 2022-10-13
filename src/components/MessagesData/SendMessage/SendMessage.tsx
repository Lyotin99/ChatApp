import { FormEvent, useEffect, useRef } from "react";
import { useMessagesContext } from "../../../context/MessagesContext";
import { useChatContext } from "../../../context/ChatsContext";
import { socket } from "../../../utils/socket";

interface SendMessageProps {
	chatId: string;
}

const SendMessage = ({ chatId }: SendMessageProps) => {
	const messageForm = useRef<HTMLInputElement>(null);
	const { messages, postMessage, addMessageToChat } = useMessagesContext();
	const { updateChatLatestMessage } = useChatContext();

	useEffect(() => {
		messages && messageForm.current?.focus();
	}, [messages]);

	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const content = String(formData.get("content"));

		if (content.trim()) {
			postMessage(content, chatId).then((res) => {
				socket.emit("new message", res.message);

				addMessageToChat(res.message);
			});
			updateChatLatestMessage(chatId, content);
			e.currentTarget.reset();
		}
	};

	return (
		<form onSubmit={submitHandler}>
			<input ref={messageForm} type="text" name="content" />
		</form>
	);
};

export default SendMessage;
