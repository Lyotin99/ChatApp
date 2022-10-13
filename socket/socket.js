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

		socket.on("new message", (newMessageRecieved) => {
			var chat = newMessageRecieved.chat;

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
	});
};

export default initSocket;
