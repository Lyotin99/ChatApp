import { io } from "socket.io-client";

const ENDPOINT = "http://localhost:5000";
// let selectedChatCompare;

export const socket = io(ENDPOINT);
