import userModel from "../models/userModel.js";

const searchUsers = async (req, res) => {
	const keyword = req.query.search
		? {
				$or: [
					{ username: { $regex: req.query.search, $options: "i" } },
					{ email: { $regex: req.query.search, $options: "i" } },
				],
		  }
		: {};

	const users = await userModel
		.find(keyword)
		.find({ _id: { $ne: req.user.userId } });

	res.status(200).json(users);
};

export { searchUsers };
