import "./styles/load.scss";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ChatPage from "./pages/ChatPage";

function App() {
	return (
		<div className="wrapper">
			<div className="wrapper__inner">
				<div className="main">
					<Routes>
						<Route path="/" element={<Homepage />} />

						<Route path="/chats" element={<ChatPage />} />
					</Routes>
				</div>
			</div>
		</div>
	);
}

export default App;
