import express from "express";
import connectDb from "./connect/connectDb.js";
import authRoute from "./routes/auth.js";
import { config } from "dotenv";
import { chats } from "./data/data.js";
import cors from "cors";
import authenticate from "./middlewares/authentication.js";

const app = express();
config();

//middlewares
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoute);

app.get("/api/v1/chats", authenticate, (req, res) => {
	res.send(chats);
});

app.get("/api/v1/chats/:id", (req, res) => {
	const chat = chats.find((chat) => chat._id === req.params.id);

	if (!chat) {
		return res.send(404);
	}

	res.send(chat);
});

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
