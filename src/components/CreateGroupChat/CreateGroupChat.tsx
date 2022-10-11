import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import useDebounce from "../../hooks/useDebounce";
import searchUsers from "../../services/UserServices";
import UserItem from "../UserItem/UserItem";
import { motion } from "framer-motion";
import { User } from "../../utils/types";
import { useChatContext } from "../../context/ChatsContext";

const CreateGroupChat = ({
	hideModalHandler,
	isVisible,
}: {
	hideModalHandler: () => void;
	isVisible: boolean;
}) => {
	const [search, setSearch] = useState<string>("");
	const [users, setUsers] = useState<[] | null>(null);
	const [usersId, setUsersId] = useState<string[]>([]);
	const debounce = useDebounce(search, 500);
	const {
		user: { token },
	} = useAuthContext();
	const { createGroupChat } = useChatContext();
	const navigate = useNavigate();

	useEffect(() => {
		debounce &&
			searchUsers(debounce, token).then((data) => {
				setUsers(data);
			});
	}, [debounce, token]);

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const groupName = String(formData.get("group-name"));

		if (usersId.length > 2 || groupName) {
			createGroupChat(groupName, usersId).then((res) => {
				navigate(`/chats/${res._id}`);
				hideModalHandler();
			});

			setUsersId([]);
			e.currentTarget.reset();
		}
	};

	return (
		<motion.div
			className="create-group-modal"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
		>
			<div className="cgm__overlay" onClick={hideModalHandler}></div>

			<div className="cgm__inner">
				<button className="cgm__close" onClick={hideModalHandler}>
					X
				</button>

				<div className="cgm__head">
					<h2>Create Group</h2>
				</div>

				<div className="cgm__form">
					<form action="POST" onSubmit={submitHandler}>
						<div className="form__body">
							<div className="form__row">
								<div className="form__label">
									<label htmlFor="">Users</label>
								</div>

								<div className="form__control">
									<input
										type="text"
										value={search}
										onChange={(e) =>
											setSearch(e.currentTarget.value)
										}
										placeholder="Search Users"
									/>

									{users && users.length > 0 && (
										<div className="cgm__search-users">
											{users.map((user: User) => (
												<div
													className={`user-search ${
														usersId.includes(
															user._id
														)
															? "is-picked"
															: ""
													}`}
													key={user._id}
													onClick={() => {
														!usersId.includes(
															user._id
														)
															? setUsersId([
																	...usersId,
																	user._id,
															  ])
															: setUsersId(
																	usersId.filter(
																		(
																			userId: string
																		) =>
																			userId !==
																			user._id
																	)
															  );
													}}
												>
													<UserItem
														user={user}
														isGroupChat={true}
													/>
												</div>
											))}
										</div>
									)}
								</div>
							</div>

							<div className="form__row">
								<div className="form__label">
									<label htmlFor="group-name">
										Group Name
									</label>
								</div>

								<div className="form__control">
									<input
										type="text"
										placeholder="Enter group name..."
										id="group-name"
										name="group-name"
									/>
								</div>
							</div>
						</div>

						<div className="form__actions">
							<button className="btn" type="submit">
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</motion.div>
	);
};

export default CreateGroupChat;
