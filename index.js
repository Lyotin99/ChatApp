import express from "express";
import connectDb from "./connect/connectDb.js";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import chatsRoute from "./routes/chats.js";
import { config } from "dotenv";
import cors from "cors";
import authenticate from "./middlewares/authentication.js";

const app = express();
config();

//middlewares
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", authenticate, usersRoute);
app.use("/api/v1/chats", authenticate, chatsRoute);

const PORT = process.env.PORT || 5000;

const start = async () => {
	try {
		app.listen(PORT, () => console.log(`Listen on port ${PORT}`));
		await connectDb(process.env.MONGO_URI);
	} catch (e) {
		console.log(e);
	}
};

start();
