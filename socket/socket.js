import { Server } from "socket.io";

const initSocket = (server) => {
	const io = new Server(server, {
		pingTimeout: 60000,
		cors: {
			origin: "http://localhost:3000",
		},
	});

	const users = {};
	io.on("connection", (socket) => {
		console.log("Connected to socket.io");

		socket.on("setup", (userData) => {
			socket.join(userData.userId);

			socket.broadcast.emit("connected");
		});

		socket.on("login", (data) => {
			console.log("a user " + data.userId + " connected");
			// saving userId to object with socket ID
			users[socket.id] = data.userId;
			console.log(users);
			socket.broadcast.emit("user connected", users);
		});

		socket.on("disconnect", () => {
			console.log("User disconnected");

			delete users[socket.id];
		});

		socket.on("logout", (userId) => {
			console.log("User logout");
			delete users[socket.id];
			socket.broadcast.emit("user logout", users);

			socket.disconnect();
		});

		socket.on("join room", (roomId) => {
			socket.join(roomId);

			console.log("User joined " + roomId);
		});

		socket.on("leave room", (roomId) => {
			socket.leave(roomId);

			console.log("User left " + roomId);
		});

		socket.on("typing", (roomId) => {
			console.log("Typing in chat: " + roomId);
			socket.to(roomId).emit("typing", roomId);
		});

		socket.on("stop typing", (roomId) =>
			socket.to(roomId).emit("stop typing", roomId)
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
