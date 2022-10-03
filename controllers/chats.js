import Chat from "../models/chatModel.js";
import User from "../models/userModel.js";

const createChat = async (req, res) => {
	const { userId } = req.params;

	if (!userId) {
		return res.status(404).json({ msg: "User not found" });
	}

	let isChat = await Chat.find({
		isGroupChat: false,
		$and: [
			{ users: { $elemMatch: { $eq: req.user.userId } } },
			{ users: { $elemMatch: { $eq: userId } } },
		],
	})
		.populate("users", "-password")
		.populate("latestMessage");

	isChat = await User.populate(isChat, {
		path: "latestMessage.sender",
		select: "name photo email",
	});

	if (isChat.length > 0) {
		res.status(200).json({ chats: isChat[0] });
	} else {
		let chatData = {
			chatName: "sender",
			isGroupChat: false,
			users: [req.user.userId, userId],
		};

		try {
			const createChat = await Chat.create(chatData);

			const fullChat = await Chat.find({ _id: createChat._id }).populate(
				"users",
				"-password"
			);

			res.status(200).json({ fullChat });
		} catch (e) {
			res.status(400);
			throw new Error(error.message);
		}
	}
};

const getAllUserChats = async (req, res) => {
	const { userId } = req.user;

	await Chat.find({
		users: { $elemMatch: { $eq: userId } },
	})
		.populate("users", "-password")
		.populate("groupAdmin")
		.populate("latestMessage")
		.sort({ updatedAt: -1 })
		.then(async (results) => {
			results = await User.populate(results, {
				path: "latestMessage.sender",
				select: "name photo email",
			});
			res.status(200).json({ chats: results });
		})
		.catch((e) => {
			res.status(400);
			throw new Error(e);
		});
};

const createGroupChat = async (req, res) => {
	const { users, chatName } = req.body;

	if (!users || !chatName) {
		return res.status(400).json({ msg: "Please fill all the fields" });
	}

	let usersList = JSON.parse(users);

	if (usersList.length < 2) {
		return res
			.status(400)
			.send("More than 2 users are required to form a group chat");
	}

	usersList.push(req.user.userId);

	try {
		const groupChat = await Chat.create({
			chatName: req.body.chatName,
			users: usersList,
			isGroupChat: true,
			groupAdmin: req.user.userId,
		});

		const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
			.populate("users", "-password")
			.populate("groupAdmin", "-password");

		res.status(200).json(fullGroupChat);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
};

const renameGroup = async (req, res) => {
	const { chatName } = req.body;
	const { groupId } = req.params;

	const newGroup = await Chat.findByIdAndUpdate(
		groupId,
		{
			chatName,
		},
		{
			new: true,
		}
	)
		.populate("users", "-password")
		.populate("groupAdmin", "-password");

	if (!newGroup) {
		return res.status(404).json({ msg: "Not Found" });
	}

	res.status(200).json({ chat: newGroup });
};

const removeGroup = async (req, res) => {
	const { groupId } = req.params;

	const newGroup = await Chat.findByIdAndDelete(groupId, {
		new: true,
	})
		.populate("users", "-password")
		.populate("groupAdmin", "-password");

	if (!newGroup) {
		return res.status(404).json({ msg: "Not Found" });
	}

	res.status(200).json({ chat: newGroup });
};

export {
	createChat,
	createGroupChat,
	getAllUserChats,
	renameGroup,
	removeGroup,
};
