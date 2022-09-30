import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const Homepage = () => {
	return (
		<>
			<section className="section-tabs">
				<div className="shell">
					<div className="section__inner">
						<div className="section__head">
							<h1>Chat App</h1>
						</div>

						<div className="section__body">
							<Tabs className="tabs">
								<TabList className="tabs__nav">
									<Tab>Login</Tab>

									<Tab>Register</Tab>
								</TabList>

								<TabPanel>
									<Login />
								</TabPanel>
								<TabPanel>
									<Register />
								</TabPanel>
							</Tabs>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Homepage;
