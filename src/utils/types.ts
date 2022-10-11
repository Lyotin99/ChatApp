export interface User {
	_id: string;
	photo: string;
	email: string;
	username: string;
	createdAt: string;
	updatedAt: string;
}

export interface Message {
	_id: string;
	sender: User;
	content: string;
	chat: string;
	createdAt: string;
	updatedAt: string;
}

export interface Chat {
	_id: string;
	chatName: string;
	isGroupChat: boolean;
	createdAt: string;
	updatedAt: string;
	users: User[];
	groupAdmin: User;
	latestMessage: Message;
}
