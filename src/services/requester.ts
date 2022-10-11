export const requester = async <T>(method: string, url: string, data?: T) => {
	try {
		let req = null;

		if (method === "GET") {
			req = await fetch(url, {
				headers: {
					Authorization: `Bearer ${getToken()}`,
					"Content-Type": "application/json",
				},
			});
		} else {
			req = await fetch(url, {
				method: method,
				headers: {
					Authorization: `Bearer ${getToken()}`,
					"Content-Type": "application/json",
				},
				body: data ? JSON.stringify(data) : null,
			});
		}

		const res = await req.json();

		return res;
	} catch (e) {
		console.log(e);
	}
};

export const getToken = () => {
	try {
		const userData = localStorage.getItem("user");

		if (!userData) {
			return;
		}

		const user = JSON.parse(userData);

		return user.token;
	} catch (error) {
		console.log(error);
	}
};

export const get = requester.bind(null, "GET");
export const post = requester.bind(null, "POST");
export const patch = requester.bind(null, "PATCH");
export const remove = requester.bind(null, "DELETE");
