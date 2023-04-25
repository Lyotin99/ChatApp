const baseURL = "https://chatapp-api-j757.onrender.com/api/v1/auth";

interface UserLogin {
	email: string;
	password: string;
}

interface UserRegister {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
	photo?: string;
}

export const authLogin = async (userData: UserLogin) => {
	const req = await fetch(`${baseURL}/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	});
	const res = await req.json();

	if (!req.ok) {
		return { ok: false, msg: res.msg };
	}

	return { ok: true, data: res };
};

export const authRegister = async (userData: UserRegister) => {
	const req = await fetch(`${baseURL}/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	});

	const res = await req.json();

	if (!req.ok) {
		return { ok: false, msg: res.msg };
	}

	return { ok: true, data: res };
};
