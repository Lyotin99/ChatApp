import "./styles/load.scss";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ChatPage from "./pages/ChatPage";
import AuthProvider from "./context/AuthContext";
import AuthRoute from "./components/Common/AuthRoute/AuthRoute";
import GuestRoute from "./components/Common/GuestRoute/GuestRoute";
import Header from "./components/Header/Header";
import ChatsProvider from "./context/ChatsContext";
import MessagesProvider from "./context/MessagesContext";

function App() {
	return (
		<AuthProvider>
			<ChatsProvider>
				<MessagesProvider>
					<div className="wrapper">
						<div className="wrapper__inner">
							<Header />

							<div className="main">
								<Routes>
									<Route
										path="/"
										element={
											<GuestRoute>
												<Homepage />
											</GuestRoute>
										}
									/>

									<Route
										path="/chats"
										element={
											<AuthRoute>
												<ChatPage />
											</AuthRoute>
										}
									/>

									<Route
										path="/chats/:chatId"
										element={
											<AuthRoute>
												<ChatPage />
											</AuthRoute>
										}
									/>
								</Routes>
							</div>
						</div>
					</div>
				</MessagesProvider>
			</ChatsProvider>
		</AuthProvider>
	);
}

export default App;
