import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import SearchUsersModal from "../SearchUsersModal/SearchUsersModal";

const Header = () => {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const {
		user: { userId },
	} = useAuthContext();

	const closeHandler = () => {
		setIsVisible(false);
	};

	return userId ? (
		<header className="header">
			<div className="shell">
				<div className="header__inner">
					<div className="header__aside">
						<div className="search">
							<button onClick={() => setIsVisible(true)}>
								<FontAwesomeIcon icon={faMagnifyingGlass} />
								Search User
							</button>

							<SearchUsersModal
								isHidden={closeHandler}
								isVisible={isVisible}
							/>
						</div>
					</div>

					<div className="header__content">
						<h4>Chat App</h4>
					</div>

					<div className="header__aside">
						<p>Hello Mustafa</p>
					</div>
				</div>
			</div>
		</header>
	) : null;
};

export default Header;
