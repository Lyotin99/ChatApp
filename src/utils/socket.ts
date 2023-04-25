import { io } from "socket.io-client";

const ENDPOINT = "https://chatapp-api-j757.onrender.com";

export const socket = io(ENDPOINT, {
	forceNew: true,
	reconnection: true,
});
