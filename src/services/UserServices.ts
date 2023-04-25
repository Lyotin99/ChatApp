import * as requester from "./requester";
const usersURL = `https://chatapp-api-j757.onrender.com/api/v1/users?search=`;

const searchUsers = async (search: string, token: string) => {
	const res = requester.get(`${usersURL}${search}`);

	return res;
};

export default searchUsers;
