import express from "express";
import { config } from "dotenv";
import { chats } from "./data/data.js";

const app = express();
config();

app.get("/api/v1/chats", (req, res) => {
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

app.listen(PORT, () => console.log(`Listen on port ${PORT}`));
