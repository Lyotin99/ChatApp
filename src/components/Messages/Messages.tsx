import { useEffect, useRef } from "react";
import { useMessagesContext } from "../../context/MessagesContext";
import { Message } from "../../utils/types";
import SendMessage from "../SendMessage/SendMessage";
import MessageItem from "../MessageItem/MessageItem";

const Messages = ({ chatId }: { chatId: string }) => {
	const anchor = useRef<HTMLDivElement>(null);
	const { messages } = useMessagesContext();

	useEffect(() => {
		if (messages.length > 0) {
			anchor.current?.scrollIntoView({
				behavior: "smooth",
			});
		}
	}, [messages]);

	return (
		<div className="section__messages">
			<div className="messages">
				{messages.length > 0
					? messages.map((message: Message) => {
							return (
								<MessageItem
									key={message._id}
									message={message}
								/>
							);
					  })
					: "No messages"}
				<div ref={anchor}></div>
			</div>

			<div className="messages-form">
				<SendMessage chatId={chatId} />
			</div>
		</div>
	);
};

export default Messages;
