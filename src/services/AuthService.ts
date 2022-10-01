const baseURL = "http://localhost:5000/api/v1/auth";

interface User {
	email: string;
	password: string;
}

export const authLogin = async (userData: User) => {
	const data = await fetch(`${baseURL}/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	});

	const res = await data.json();

	return res;
};
