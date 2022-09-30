import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userModel = new mongoose.Schema(
	{
		username: {
			type: String,
			trim: true,
			required: [true, "Username is empty!"],
		},
		email: {
			type: String,
			required: [true, "Email is empty"],
			trim: true,
			unique: true,
			match: [
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				"Please provide valid email",
			],
		},
		password: {
			type: String,
			trim: true,
			required: [true, "Password is empty"],
		},
		photo: {
			type: String,
			trim: true,
			required: true,
			default:
				"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
		},
	},
	{ timestamps: true }
);

userModel.pre("save", async function (next) {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

userModel.methods.createJwt = function () {
	return jwt.sign(
		{ userId: this._id, username: this.username },
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_LIMIT }
	);
};

userModel.methods.comparePasswords = function (comparedPassword) {
	const isTrue = bcrypt.compare(comparedPassword, this.password);

	return isTrue;
};

export default mongoose.model("User", userModel);
