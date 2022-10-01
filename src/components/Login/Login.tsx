import { authLogin } from "../../services/AuthService";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();
	const { login } = useAuthContext();

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const email = String(formData.get("email"));
		const password = String(formData.get("password"));

		if (email || password) {
			authLogin({ email, password }).then((data) => {
				login(data);
				navigate("/chats");
			});
		}
	};

	return (
		<form className="form-login" onSubmit={submitHandler}>
			<div className="form__body">
				<div className="form__row">
					<div className="form__label">
						<label htmlFor="email-login">Enter email</label>
					</div>

					<div className="form__control">
						<input
							type="email"
							id="email-login"
							name="email"
							placeholder="Enter email..."
						/>
					</div>
				</div>

				<div className="form__row">
					<div className="form__label">
						<label htmlFor="password-login">Enter password</label>
					</div>

					<div className="form__control">
						<input
							type="password"
							id="password-login"
							name="password"
							placeholder="Enter password..."
						/>
					</div>
				</div>
			</div>

			<div className="form__actions">
				<button className="btn" type="submit">
					Login
				</button>

				<button className="btn btn--orange">
					Guest User Credentials
				</button>
			</div>
		</form>
	);
};

export default Login;
