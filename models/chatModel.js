import mongoose, { mongo } from "mongoose";

const chatModel = new mongoose.Schema(
	{
		chatName: {
			type: String,
			trim: true,
		},
		isGroupChat: {
			type: Boolean,
			default: false,
		},
		users: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		latestMessage: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Messages",
		},
		groupAdmin: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Chat", chatModel);
