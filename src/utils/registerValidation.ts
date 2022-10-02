export const regValidate = (
	username: string,
	email: string,
	password: string,
	confirmPassword: string
) => {
	if (!email || !username || !password || !confirmPassword) {
		return "Empty fields";
	}

	if (password.trim() !== confirmPassword.trim()) {
		return "Passwords don't match";
	}

	return true;
};
