import jwt from "jsonwebtoken";

const authenticateMiddleware = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer"))
		return res.status(401).json({ msg: "No token provided" });

	const token = authHeader.split(" ")[1];

	const { userId, username } = jwt.verify(token, process.env.JWT_SECRET);

	req.user = {
		userId,
		username,
	};

	next();
};

export default authenticateMiddleware;
