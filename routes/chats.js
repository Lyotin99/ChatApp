import express from "express";
import {
	createChat,
	createGroupChat,
	getAllUserChats,
	removeGroup,
	renameGroup,
} from "../controllers/chats.js";

const router = express.Router();

router.post("/createGroup", createGroupChat);
router.get("/", getAllUserChats);
router.post("/:userId", createChat);
router.patch("/:groupId", renameGroup);
router.delete("/:groupId", removeGroup);

export default router;
