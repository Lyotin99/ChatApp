import { Server } from "socket.io";

const initSocket = (server) => {
	const io = new Server(server, {
		pingTimeout: 60000,
		cors: {
			origin: "http://localhost:3000",
		},
	});

	io.on("connection", (socket) => {
		console.log("Connected to socket.io");

		socket.on("setup", (userData) => {
			socket.join(userData.userId);

			socket.emit("connected");
		});

		socket.on("join room", (roomId) => {
			socket.join(roomId);

			console.log("User joined " + roomId);
		});

		socket.on("typing", (roomId) => socket.in(roomId).emit("typing"));

		socket.on("stop typing", (roomId) =>
			socket.in(roomId).emit("stop typing")
		);

		socket.on("new message", (newMessageRecieved) => {
			let chat = newMessageRecieved.chat;

			if (!chat.users) return console.log("chat.users not defined");

			chat.users.forEach((user) => {
				if (user._id === newMessageRecieved.sender._id) return;
				else {
					socket
						.in(user._id)
						.emit("message received", newMessageRecieved);
				}
			});
		});

		socket.off("setup", () => {
			console.log("User Disconnected");
			socket.leave(userData._id);
		});
	});
};

export default initSocket;
