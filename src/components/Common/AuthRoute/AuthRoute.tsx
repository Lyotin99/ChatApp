import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";

const AuthRoute = ({ children }: { children: JSX.Element }) => {
	const {
		user: { userId },
	} = useAuthContext();

	return userId ? children : <Navigate to="/" />;
};

export default AuthRoute;
