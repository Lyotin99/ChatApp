import { useEffect, useRef, useState } from "react";
import { useMessagesContext } from "../../../context/MessagesContext";
import { useChatContext } from "../../../context/ChatsContext";
import { socket } from "../../../utils/socket";
import loader from "../../../assets/messageLoader.svg";
import { useAuthContext } from "../../../context/AuthContext";

interface SendMessageProps {
	chatId: string;
}

const SendMessage = ({ chatId }: SendMessageProps) => {
	const [isTyping, setIsTyping] = useState<boolean>(false);
	const [typing, setTyping] = useState<boolean>(false);
	const messageForm = useRef<HTMLInputElement>(null);
	const { messages, postMessage, addMessageToChat } = useMessagesContext();
	const { socketConnected } = useAuthContext();
	const { updateChatLatestMessage } = useChatContext();

	useEffect(() => {
		socket.on("typing", (roomId) => {
			if (roomId === chatId) {
				setIsTyping(true);
				console.log(roomId, " ", chatId);
			}
		});
		socket.on("stop typing", (roomId) => {
			if (roomId === chatId) {
				setIsTyping(false);
				console.log(roomId, " ", chatId);
			}
		});
	}, [chatId]);

	useEffect(() => {
		messages && messageForm.current?.focus();
	}, [messages]);

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const content = String(formData.get("content"));

		if (content.trim()) {
			postMessage(content, chatId).then((res) => {
				socket.emit("new message", res.message);

				addMessageToChat(chatId, res.message);
			});
			setTyping(false);
			socket.emit("stop typing", chatId);

			updateChatLatestMessage(chatId, content);
			e.currentTarget.reset();
		}
	};

	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!socketConnected) return;

		if (!typing) {
			setTyping(true);
			socket.emit("typing", chatId);
		}

		setTimeout(() => {
			setTyping(false);
			socket.emit("stop typing", chatId);
		}, 500);
	};

	return (
		<form onSubmit={submitHandler}>
			{isTyping ? (
				<img src={loader} alt="Loader" style={{ width: 60 }} />
			) : (
				""
			)}
			<input
				ref={messageForm}
				type="text"
				name="content"
				onChange={changeHandler}
			/>
		</form>
	);
};

export default SendMessage;
