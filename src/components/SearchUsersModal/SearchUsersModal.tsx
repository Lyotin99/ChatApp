import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useDebounce from "../../hooks/useDebounce";
import searchUsers from "../../services/UserServices";
import UserItem from "../UserItem/UserItem";

interface User {
	_id: string;
	createdAt: string;
	email: string;
	photo: string;
	updatedAt: string;
	username: string;
}

const SearchUsersModal = ({
	isVisible,
	isHidden,
}: {
	isVisible: boolean;
	isHidden: () => void;
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isClicked, setIsClicked] = useState<boolean>(false);
	const [searchField, setSearchField] = useState<string>("");
	const [users, setUsers] = useState<User[]>([]);
	const debounce = useDebounce(searchField, 500);

	const {
		user: { token },
	} = useAuthContext();

	useEffect(() => {
		debounce
			? searchUsers(debounce, token).then((data) => {
					setIsLoading(true);
					setUsers(data);
					setIsLoading(false);
			  })
			: setUsers([]);
	}, [debounce, token]);

	return (
		<div className={`search-modal ${isVisible ? "is-visible" : ""}`}>
			<button onClick={isHidden}>
				<FontAwesomeIcon icon={faClose} />
			</button>

			<div className="search__modal-inner">
				<div className="search__modal-head">
					<h4>Search Users</h4>
				</div>

				<div className="search__modal-body">
					<input
						type="text"
						value={searchField}
						onChange={(e) => setSearchField(e.target.value)}
						placeholder="Search for users..."
					/>

					<div className="search__modal-list">
						{users.map((user: User) => {
							return (
								<div
									className="user-search"
									key={user._id}
									onClick={isHidden}
								>
									<UserItem user={user} />
								</div>
							);
						})}
					</div>

					{isLoading ? "Loading..." : ""}
				</div>
			</div>
		</div>
	);
};

export default SearchUsersModal;
