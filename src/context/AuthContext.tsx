import { useContext, createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { socket } from "../utils/socket";

interface AuthContextData {
	login: (userData: User) => void;
	logout: () => void;
	user: User;
	userConnected: boolean;
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
	const login = (userData: User) => {
		setUser(userData);
	};

	const logout = () => {
		setUser(initialUser);
	};

	useEffect(() => {
		socket.emit("setup", user);
		socket.on("connected", () => setSocketConnected(true));
	}, [user]);

	return (
		<AuthContext.Provider
			value={{ login, logout, user, userConnected: socketConnected }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
