import { useAuthContext } from "../../../context/AuthContext";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }: { children: JSX.Element }) => {
	const {
		user: { userId },
	} = useAuthContext();

	return userId ? <Navigate to="/chats" /> : children;
};

export default GuestRoute;
