import { authLogin } from "../../services/AuthService";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import FormRow from "../UI/FormRow/FormRow";
import { useState } from "react";

const Login = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const navigate = useNavigate();
	const { login } = useAuthContext();

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		const formData = new FormData(e.currentTarget);
		const email = String(formData.get("email"));
		const password = String(formData.get("password"));

		if (email || password) {
			authLogin({ email, password }).then((res) => {
				if (!res.ok) {
					setError(res.msg);
					setIsLoading(false);
				} else {
					console.log(res.data);
					login(res.data);
					navigate("/chats");
				}
			});
		} else {
			setError("Empty fields");
		}
	};

	return (
		<form className="form-login" onSubmit={submitHandler}>
			<div className="form__body">
				<FormRow
					id="email-login"
					label="Enter email"
					type="email"
					name="email"
					placeholder="Enter email..."
					required
				/>

				<FormRow
					id="password-login"
					label="Enter password"
					type="password"
					name="password"
					placeholder="Enter password..."
					required
				/>
			</div>

			<div className="form__actions">
				<button className="btn" type="submit">
					Login
				</button>

				<button className="btn btn--orange">
					Guest User Credentials
				</button>
			</div>

			{isLoading && <span className="form__loader">Loading...</span>}

			{error && <span className="form__error">{error}</span>}
		</form>
	);
};

export default Login;
