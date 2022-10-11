import * as requester from "./requester";
const usersURL = `http://localhost:5000/api/v1/users?search=`;

const searchUsers = async (search: string, token: string) => {
	const res = requester.get(`${usersURL}${search}`);

	return res;
};

export default searchUsers;
