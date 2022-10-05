import express from "express";
import { getAllMessages, sendMessage } from "../controllers/messages.js";

const router = express.Router();

router.post("/:chatId", sendMessage);
router.get("/:chatId", getAllMessages);

export default router;
