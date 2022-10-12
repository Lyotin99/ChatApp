import { motion } from "framer-motion";
import { useChatContext } from "../../../context/ChatsContext";

const DeleteModal = ({
	isVisible,
	isHidden,
	id,
}: {
	isVisible: boolean;
	isHidden: () => void;
	id: string;
}) => {
	const { removeGroupChat } = useChatContext();

	const deleteHandler = () => {
		removeGroupChat(id).then(() => {
			isHidden();
		});
	};

	return isVisible ? (
		<div className="modal">
			<motion.div
				className="modal__bg"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			></motion.div>

			<motion.div
				className="modal__inner"
				initial={{ y: "-100vh" }}
				animate={{ y: 0 }}
				transition={{ delay: 0.2 }}
				exit={{ y: "-100vh" }}
			>
				<div className="modal__content">
					<h5>Are you sure you want to delete this group chat?</h5>
				</div>

				<div className="modal__actions">
					<button className="btn" onClick={isHidden}>
						Cancel
					</button>

					<button className="btn btn--delete" onClick={deleteHandler}>
						Delete
					</button>
				</div>
			</motion.div>
		</div>
	) : null;
};

export default DeleteModal;
