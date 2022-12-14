import { useEffect, useRef, useState } from "react";
import { useMessagesContext } from "../../../context/MessagesContext";
import { Message } from "../../../utils/types";
import SendMessage from "../SendMessage/SendMessage";
import MessageItem from "../MessageItem/MessageItem";
import DeleteModal from "../../Common/DeleteModal/DeleteModal";
import { useChatContext } from "../../../context/ChatsContext";
import EditModal from "../../Common/EditModal/EditModal";
import { socket } from "../../../utils/socket";

const Messages = ({
	chatId,
	selectedChat,
}: {
	chatId: string;
	selectedChat: string;
}) => {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [isVisibleUpdateChat, setIsVisibleUpdateChat] =
		useState<boolean>(false);
	const anchor = useRef<HTMLDivElement>(null);
	const { messages, addMessageToChat } = useMessagesContext();
	const { getOneChat } = useChatContext();
	const chat = getOneChat(chatId);

	useEffect(() => {
		if (messages.length > 0) {
			anchor.current?.scrollIntoView({
				behavior: "smooth",
			});
		}
	}, [messages, chatId]);

	useEffect(() => {
		socket.on("message received", (newMessageReceived) => {
			if (!chatId && newMessageReceived.chat._id !== chatId) {
				console.log("Not chat");
			} else {
				addMessageToChat(chatId, newMessageReceived);
			}
		});
	});

	const isHidden = () => {
		setIsVisible(false);
	};

	const isHiddenUpdateChat = () => {
		setIsVisibleUpdateChat(false);
	};

	return (
		<div className="section__messages">
			<div
				className={`section__messages-actions ${
					chat && chat.isGroupChat
						? "section__messages-actions--group"
						: ""
				}`}
			>
				<button className="btn" onClick={() => setIsVisible(true)}>
					Delete Chat
				</button>

				<DeleteModal
					isVisible={isVisible}
					isHidden={isHidden}
					id={chatId}
				/>

				<button
					className="btn"
					onClick={() => setIsVisibleUpdateChat(true)}
				>
					Edit Chat
				</button>

				<EditModal
					isVisible={isVisibleUpdateChat}
					isHidden={isHiddenUpdateChat}
					id={chatId}
				/>
			</div>

			<div className="messages">
				{messages.length > 0 && chat
					? messages.map((message: Message) => {
							return (
								<MessageItem
									key={message._id}
									message={message}
								/>
							);
					  })
					: ""}
				<div ref={anchor}></div>
			</div>

			<div className="messages-form">
				<SendMessage chatId={chatId} />
			</div>
		</div>
	);
};

export default Messages;
