import { useState } from "react";
import { useParams } from "react-router-dom";
import ChatItem from "../components/ChatItem/ChatItem";
import CreateGroupChat from "../components/CreateGroupChat/CreateGroupChat";
import Messages from "../components/Messages/Messages";
import { useChatContext } from "../context/ChatsContext";

const ChatPage = () => {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const { chats } = useChatContext();
	const { chatId } = useParams();

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
