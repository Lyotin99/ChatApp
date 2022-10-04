const usersURL = `http://localhost:5000/api/v1/users?search=`;

const searchUsers = async (search: string, token: string) => {
	const req = await fetch(`${usersURL}${search}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const res = await req.json();

	return res;
};

export default searchUsers;
