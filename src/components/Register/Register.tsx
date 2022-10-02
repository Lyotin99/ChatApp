import { useState } from "react";
import { uploadImg } from "../../services/CloudinaryService";
import { authRegister } from "../../services/AuthService";
import { regValidate } from "../../utils/registerValidation";
import { useAuthContext } from "../../context/AuthContext";
import FormRow from "../UI/FormRow/FormRow";

const Register = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isImageUploaded, setIsImageUploaded] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const { login } = useAuthContext();

	const setIsImageUploadedHandler = () => {
		setIsImageUploaded(true);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		const formData = new FormData(e.currentTarget);
		const username = String(formData.get("username"));
		const email = String(formData.get("email"));
		const password = String(formData.get("password"));
		const confirmPassword = String(formData.get("confirmPassword"));
		const pic = formData.get("pic");
		const validation = regValidate(
			username,
			email,
			password,
			confirmPassword
		);

		if (!validation) {
			setError(validation);
			setIsLoading(false);
			return;
		}

		if (pic && isImageUploaded) {
			uploadImg(pic, formData).then((data) => {
				if (!data.error) {
					authRegister({
						username,
						email,
						password,
						confirmPassword,
						photo: data.secure_url,
					}).then((res) => {
						setIsLoading(false);
						return !res.ok ? setError(res.msg) : login(res.data);
					});
				} else {
					setError("Something went wrong. Try again later!");
				}
			});
		} else {
			authRegister({
				username,
				email,
				password,
				confirmPassword,
			}).then((res) => {
				setIsLoading(false);
				return !res.ok ? setError(res.msg) : login(res.data);
			});
		}
	};

	return (
		<form className="form-login" onSubmit={handleSubmit}>
			<div className="form__body">
				<FormRow
					id="username"
					label="Username"
					name="username"
					type="text"
					placeholder="Enter username..."
					required
				/>

				<FormRow
					id="email"
					label="Email"
					name="email"
					type="email"
					placeholder="Enter email..."
					required
				/>

				<FormRow
					id="password"
					label="Password"
					name="password"
					type="password"
					placeholder="Enter password..."
					required
				/>

				<FormRow
					id="confirmPassword"
					label="Confirm password"
					name="confirmPassword"
					type="password"
					placeholder="Confirm your password..."
					required
				/>

				<FormRow
					id="pic"
					label="Upload photo (optional)"
					name="pic"
					type="file"
					required={false}
					changeHandler={setIsImageUploadedHandler}
				/>
			</div>

			<div className="form__actions">
				<button className="btn" type="submit">
					Sign up
				</button>
			</div>

			{isLoading && <span className="form__loader">Loading...</span>}

			{error && <span className="form__error">{error}</span>}
		</form>
	);
};

export default Register;
