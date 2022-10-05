import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useDebounce from "../../hooks/useDebounce";
import searchUsers from "../../services/UserServices";
import UserItem from "../UserItem/UserItem";
import { motion } from "framer-motion";

const CreateGroupChat = ({
	hideModalHandler,
	isVisible,
}: {
	hideModalHandler: () => void;
	isVisible: boolean;
}) => {
	const [search, setSearch] = useState<string>("");
	const [users, setUsers] = useState<[] | null>(null);
	const debounce = useDebounce(search, 500);
	const {
		user: { token },
	} = useAuthContext();

	useEffect(() => {
		!search && setUsers([]);

		debounce &&
			searchUsers(debounce, token).then((data) => {
				setUsers(data);
			});
	}, [debounce, token]);

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
					<form action="POST">
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
											{users.map((user: any) => (
												<UserItem
													key={user._id}
													user={user}
												/>
											))}
										</div>
									)}
								</div>
							</div>

							<div className="form__row">
								<div className="form__label">
									<label htmlFor="">Group Name</label>
								</div>

								<div className="form__control">
									<input
										type="text"
										placeholder="Enter group name..."
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
