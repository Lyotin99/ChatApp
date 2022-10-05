import Message from "../models/messageModel.js";
import User from "../models/userModel.js";
import Chat from "../models/chatModel.js";

const sendMessage = async (req, res) => {
	const { content } = req.body;
	const { chatId } = req.params;

	if (!content) {
		return res.status(400).send({ msg: "Empty field" });
	}

	let messageData = {
		content,
		sender: req.user.userId,
		chat: chatId,
	};

	try {
		let message = await Message.create(messageData);
		message = await message.populate("sender", "username photo");
		message = await message.populate("chat");
		message = await User.populate(message, {
			path: "chat.users",
			select: "username email photo",
		});

		await Chat.findByIdAndUpdate(chatId, {
			latestMessage: message._id,
		});

		res.status(201).json({ message });
	} catch (error) {
		res.status(500).json({ msg: "Internal server error" });
	}
};

const getAllMessages = async (req, res) => {
	const { chatId } = req.params;

	try {
		const messages = await Message.find({ chat: chatId })
			.sort("createdAt")
			.populate("sender", "username email photo")
			.populate("chat");

		res.status(200).json({ messages });
	} catch (error) {
		res.status(500).json({ msg: "Internal server error" });
	}
};

export { sendMessage, getAllMessages };
