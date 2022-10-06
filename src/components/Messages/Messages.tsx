import { useAuthContext } from "../../context/AuthContext";
import { Message } from "../../utils/types";

interface MessageProps {
	message: Message;
}

const Messages = ({
	message: {
		content,
		createdAt,
		sender: { _id: senderId },
	},
}: MessageProps) => {
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

export default Messages;
