import { useAuthContext } from "../../context/AuthContext";
import { useMessagesContext } from "../../context/MessagesContext";
import { Message, User } from "../../utils/types";

interface ChatItemProps {
	chat: {
		isGroupChat: boolean;
		chatName: string;
		users: User[];
		latestMessage: Message;
		_id: string;
	};
}

const ChatItem = ({
	chat: { chatName, isGroupChat, users, latestMessage, _id },
}: ChatItemProps) => {
	const {
		user: { userId },
	} = useAuthContext();
	const { getChatMessages } = useMessagesContext();

	return (
		<div onClick={() => getChatMessages(_id)} className="chat__inner">
			<div className="chat__content">
				<h6>
					{isGroupChat
						? chatName
						: users.find((user: User) => user._id !== userId)
								?.username}
				</h6>

				<p>
					<small>
						<strong>Latest:</strong>{" "}
						{latestMessage
							? latestMessage.content
							: "No messages yet!"}
					</small>
				</p>
			</div>
		</div>
	);
};

export default ChatItem;