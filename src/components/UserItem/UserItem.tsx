import { useChatContext } from "../../context/ChatsContext";

interface UserItemProps {
	user: {
		_id: string;
		createdAt: string;
		email: string;
		photo: string;
		updatedAt: string;
		username: string;
	};
}

const UserItem = ({ user }: UserItemProps) => {
	const { createUserChat } = useChatContext();

	const createChatHandler = () => {
		user && createUserChat(user._id);
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
