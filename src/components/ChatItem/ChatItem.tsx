import { useAuthContext } from "../../context/AuthContext";
import { useMessagesContext } from "../../context/MessagesContext";
import { Message, User } from "../../utils/types";
import { useNavigate } from "react-router-dom";
import { socket } from "../../utils/socket";

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
	const navigate = useNavigate();

	return (
		<div
			onClick={() => {
				getChatMessages(_id).then(() => {
					navigate(`/chats/${_id}`);
				});
			}}
			className="chat__inner"
		>
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
