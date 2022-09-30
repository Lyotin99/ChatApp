const Register = () => {
	return (
		<form className="form-login">
			<div className="form__body">
				<div className="form__row">
					<div className="form__label">
						<label htmlFor="username">Username</label>
					</div>

					<div className="form__control">
						<input
							type="text"
							id="username"
							name="username"
							placeholder="Enter username..."
						/>
					</div>
				</div>

				<div className="form__row">
					<div className="form__label">
						<label htmlFor="email">Email</label>
					</div>

					<div className="form__control">
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Enter email..."
						/>
					</div>
				</div>

				<div className="form__row">
					<div className="form__label">
						<label htmlFor="password">Password</label>
					</div>

					<div className="form__control">
						<input
							type="password"
							id="password"
							name="password"
							placeholder="Enter password..."
						/>
					</div>
				</div>

				<div className="form__row">
					<div className="form__label">
						<label htmlFor="confirmPassword">
							Confirm password
						</label>
					</div>

					<div className="form__control">
						<input
							type="password"
							id="confirmPassword"
							name="confirmPassword"
							placeholder="Confirm your password..."
						/>
					</div>
				</div>

				<div className="form__row">
					<div className="form__label">
						<label htmlFor="pic">Upload photo</label>
					</div>

					<div className="form__control">
						<input
							type="file"
							accept="image/*"
							id="pic"
							name="pic"
						/>
					</div>
				</div>
			</div>

			<div className="form__actions">
				<button className="btn" type="submit">
					Sign up
				</button>
			</div>
		</form>
	);
};

export default Register;
