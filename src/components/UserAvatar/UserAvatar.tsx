import { faChevronDown, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

const UserAvatar = () => {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const {
		user: { username },
		logout,
	} = useAuthContext();

	return (
		<div className="user-avatar">
			<button
				className={`btn__avatar ${isVisible ? "is-clicked" : ""}`}
				onClick={() => setIsVisible(!isVisible)}
			>
				Hello, {username}
				<FontAwesomeIcon icon={faChevronDown} />
			</button>

			<div
				className={`user__avatar-list${isVisible ? " is-visible" : ""}`}
			>
				<ul>
					<li>
						<button
							className="btn__avatar-logout"
							onClick={() => logout()}
						>
							<FontAwesomeIcon icon={faSignOut} />
							Logout
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default UserAvatar;
