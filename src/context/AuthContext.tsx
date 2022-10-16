import { useContext, createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { socket } from "../utils/socket";

interface AuthContextData {
	login: (userData: User) => void;
	logout: () => void;
	user: User;
	usersConnected: [string];
	socketConnected: boolean;
}

interface User {
	userId: string;
	username: string;
	email: string;
	token: string;
}

const initialUser: User = {
	token: "",
	email: "",
	userId: "",
	username: "",
};

export const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: { children: JSX.Element }) => {
	const [user, setUser] = useLocalStorage<User>("user", initialUser);
	const [socketConnected, setSocketConnected] = useState<boolean>(false);
	const [usersConnected, setUsersConnected] = useState<any>([]);
	const login = (userData: User) => {
		setUser(userData);
		socket.emit("login", userData);
		socket.connect();
	};

	const logout = () => {
		setUser(initialUser);
		socket.emit("logout", user.userId);
		socket.disconnect();
	};

	useEffect(() => {
		socket.emit("setup", user);

		socket.on("connected", () => {
			if (user.userId) {
				socket.emit("login", user);
				setSocketConnected(true);
			}
		});
	}, [user]);

	useEffect(() => {
		socket.on("user logout", (users) => {
			setUsersConnected(Object.values(users));
			setSocketConnected(false);
		});

		socket.on("user connected", (users) => {
			setUsersConnected(Object.values(users));
		});
	});

	return (
		<AuthContext.Provider
			value={{
				login,
				logout,
				user,
				usersConnected,
				socketConnected,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
