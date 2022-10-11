import { useChatContext } from "../../context/ChatsContext";
import { useNavigate } from "react-router-dom";
import { useMessagesContext } from "../../context/MessagesContext";

interface UserItemProps {
	user: {
		_id: string;
		createdAt: string;
		email: string;
		photo: string;
		updatedAt: string;
		username: string;
	};
	isGroupChat: boolean;
}

const UserItem = ({ user, isGroupChat }: UserItemProps) => {
	const { createUserChat, createGroupChat } = useChatContext();
	const { getChatMessages } = useMessagesContext();
	const navigate = useNavigate();

	const createChatHandler = () => {
		if (!isGroupChat) {
			createUserChat(user._id).then((res) => {
				getChatMessages(res._id);
				navigate(`/chats/${res._id}`);
			});
		}
	};

	return (
		<div className="user__search-inner" onClick={createChatHandler}>
			<div className="user__search-img">
				<img src={user.photo} alt={user.username} />
			</div>

			<div className="user__search-content">
				<p>{user.username}</p>

				<p>
					<small>
						<strong>Email:</strong> {user.email}
					</small>
				</p>
			</div>
		</div>
	);
};

export default UserItem;
