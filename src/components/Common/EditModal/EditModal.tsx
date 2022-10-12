import { motion } from "framer-motion";
import { useChatContext } from "../../../context/ChatsContext";

const EditModal = ({
	isVisible,
	isHidden,
	id,
}: {
	isVisible: boolean;
	isHidden: () => void;
	id: string;
}) => {
	const { updateGroupChat } = useChatContext();

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const groupName = String(formData.get("groupName"));

		if (groupName) {
			updateGroupChat(id, groupName);
			e.currentTarget.reset();
		}
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
				<form action="POST" onSubmit={submitHandler}>
					<div className="modal__content">
						<h5>Add new group name...</h5>

						<input type="text" name="groupName" />
					</div>

					<div className="modal__actions">
						<button className="btn btn--orange" onClick={isHidden}>
							Cancel
						</button>

						<button className="btn" type="submit">
							Edit
						</button>
					</div>
				</form>
			</motion.div>
		</div>
	) : null;
};

export default EditModal;
