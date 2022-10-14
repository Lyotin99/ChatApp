import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ChatItem from "../components/ChatItem/ChatItem";
import CreateGroupChat from "../components/CreateGroupChat/CreateGroupChat";
import Messages from "../components/MessagesData/Messages/Messages";
import { useChatContext } from "../context/ChatsContext";
import { socket } from "../utils/socket";

const ChatPage = () => {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const { chats } = useChatContext();
	const { chatId } = useParams();
	const ref = useRef("");

	const hideModalHandler = () => {
		setIsVisible(false);
	};

	useEffect(() => {
		if (ref.current) {
			socket.emit("leave room", ref.current);
		}
	}, [chatId]);

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
								Group Chat +
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
												onClick={() => {
													if (chatId)
														ref.current = chatId;
												}}
												className={`chat ${
													chat._id === chatId
														? "is-active"
														: ""
												}`}
												key={chat._id}
											>
												<ChatItem chat={chat} />
											</div>
										);
									})}
							</div>
						</div>
					</div>

					{chatId && <Messages chatId={chatId} />}
				</div>
			</div>
		</section>
	);
};

export default ChatPage;
