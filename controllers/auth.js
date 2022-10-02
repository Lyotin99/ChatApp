import userModel from "../models/userModel.js";

const register = async (req, res) => {
	const { username, email, password, confirmPassword, photo } = req.body;

	if (password !== confirmPassword)
		return res.status(400).json({ msg: "Passwords do not match" });

	try {
		const user = await userModel.create({
			username,
			email,
			password,
			photo:
				photo ||
				"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
		});

		const token = user.createJwt();

		res.status(201).json({ username, email, userId: user._id, token });
	} catch (e) {
		if (e.code === 11000) {
			return res.status(500).json({ msg: "Email is already taken!" });
		}

		res.status(500).json({ msg: "Oops, something went wrong!" });
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password)
		return res.status(400).json({ msg: "Not all fields are filled out" });

	try {
		const user = await userModel.findOne({ email });
		if (!user)
			return res.status(400).json({ msg: "Wrong user credentials" });

		const isPasswordMatch = await user.comparePasswords(password);

		if (!isPasswordMatch)
			return res.status(400).json({ msg: "Wrong password" });

		const token = user.createJwt();

		res.status(200).json({
			username: user.username,
			email: user.email,
			token,
		});
	} catch (e) {
		res.status(500).json({ msg: "Oops, something went wrong!" });
	}
};

export { register, login };
