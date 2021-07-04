import {
	BrowserRouter,
	Route,
	Switch,
} from "react-router-dom";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";

// components
import { Home } from "./pages/Home"
import { Transactions } from "./pages/Transacitons"

import { AuthProvider } from "./contexts/AuthContext"

// style
import { GlobalStyle } from "./style/global";

Modal.setAppElement("#root");

export function App() {
	return (
		<>
			<BrowserRouter>

				<AuthProvider>

					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/transacitons" component={Transactions} />
						<GlobalStyle />

					</Switch>

				</AuthProvider>
			</BrowserRouter>
			<ToastContainer />

		</>
	);
}
