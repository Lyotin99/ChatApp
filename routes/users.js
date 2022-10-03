import express from "express";
import { searchUsers } from "../controllers/users.js";

const router = express.Router();

router.get("/", searchUsers);

export default router;
