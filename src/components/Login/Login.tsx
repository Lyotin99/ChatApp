const Login = () => {
	return (
		<form className="form-login">
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
