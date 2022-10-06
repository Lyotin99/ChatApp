import React, { useState, useEffect, useRef } from "react";
import ChatItem from "../components/ChatItem/ChatItem";
import CreateGroupChat from "../components/CreateGroupChat/CreateGroupChat";
import Messages from "../components/Messages/Messages";
import SendMessage from "../components/SendMessage/SendMessage";
import { useChatContext } from "../context/ChatsContext";
import { useMessagesContext } from "../context/MessagesContext";
import { Message } from "../utils/types";

const ChatPage = () => {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [getChatId, setGetChatId] = useState<string>("");
	const { chats } = useChatContext();
	const { messages } = useMessagesContext();
	const anchor = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (messages.length > 0) {
			anchor.current?.scrollIntoView({
				behavior: "smooth",
			});
		}
	}, [messages]);

	const hideModalHandler = () => {
		setIsVisible(false);
	};

	return (
		<section className="section-chats">
			<div className="shell">
				<div className="section__inner">
					<div className="section__users">
						<div className="section__users-head">
							<h4>My Chats</h4>

							<button
								className="btn"
								onClick={() => setIsVisible(true)}
							>
								New Group Chat +
							</button>

							{isVisible && (
								<CreateGroupChat
									hideModalHandler={hideModalHandler}
									isVisible={isVisible}
								/>
							)}
						</div>

						<div className="section__users-body">
							<div className="chats">
								{chats &&
									chats.map((chat) => {
										return (
											<div
												className={`chat ${
													chat._id === getChatId
														? "is-active"
														: ""
												}`}
												onClick={() => {
													setGetChatId(chat._id);
												}}
												key={chat._id}
											>
												<ChatItem chat={chat} />
											</div>
										);
									})}
							</div>
						</div>
					</div>

					<div className="section__chats">
						<div className="messages">
							{messages.length > 0 &&
								messages.map((message: Message) => {
									return (
										<Messages
											key={message._id}
											message={message}
										/>
									);
								})}
							<div ref={anchor}></div>
						</div>

						<div className="messages-form">
							<SendMessage chatId={getChatId} />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ChatPage;
