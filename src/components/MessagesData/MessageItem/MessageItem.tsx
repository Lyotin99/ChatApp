import { useAuthContext } from "../../../context/AuthContext";
import { Message } from "../../../utils/types";

interface MessageItemProps {
	message: Message;
}

const MessageItem = ({
	message: {
		content,
		createdAt,
		sender: { _id: senderId },
	},
}: MessageItemProps) => {
	const {
		user: { userId },
	} = useAuthContext();

	return (
		<div
			className={`message ${senderId === userId ? "message--user" : ""}`}
		>
			<div className="message__inner">
				<p>{content}</p>
			</div>
		</div>
	);
};

export default MessageItem;
