import { motion } from "framer-motion";

const DeleteModal = () => {
	return (
		<div className="modal-delete">
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
				transition={{ delay: 0.4 }}
				exit={{ y: "-100vh" }}
			>
				<div className="modal__content">
					<h5>Are you sure you want to delete this group chat?</h5>
				</div>

				<div className="modal__actions">
					<button className="btn">Cancel</button>

					<button className="btn btn--delete">Delete</button>
				</div>
			</motion.div>
		</div>
	);
};

export default DeleteModal;
