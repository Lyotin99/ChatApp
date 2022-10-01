import { useContext, createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

interface AuthContextData {
	login: (userData: User) => void;
	logout: () => void;
	user: User;
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

	const login = (userData: User) => {
		setUser(userData);
	};

	const logout = () => {
		setUser(initialUser);
	};

	return (
		<AuthContext.Provider value={{ login, logout, user }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
