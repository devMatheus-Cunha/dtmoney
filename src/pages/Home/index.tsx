import {
	useCallback, useContext, useState,
} from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";

// container
import { ToastNotification } from "../../container/Toast"

// Images
import alertImg from "../../images/alert-circle.svg"

// Style
import "./style.scss";

// Detabase
import { authConfig } from "../../services/firebase";

// -------------------------------------------------
// Export Function
// -------------------------------------------------
export function Home() {
	const { setUser } = useContext(AuthContext)

	// State
	const [emailUser, setEmailUser] = useState("")
	const [passwordUser, setPasswordUser] = useState("")

	const loginHandler = useCallback(
		async (event) => {
			event.preventDefault();

			try {
				await authConfig
					.auth()
					.signInWithEmailAndPassword(emailUser, passwordUser);
				setUser("")
			} catch (error) {
				toast.error(
					<ToastNotification
						type={alertImg}
						content="Dados informados estão incorretos!"
					/>, {
						position: "top-right",
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					},
				);
			}
		},
		[emailUser, passwordUser, setUser],
	);

	// -------------------------------------------------
	// Render
	// -------------------------------------------------
	return (
		<div id="page-auth">
			<main>
				<div className="main-content">
					<div className="separator">Fazer Login</div>
					<form onSubmit={loginHandler}>
						<input
							type="email"
							name="email"
							placeholder="Digite o código da sala"
							onChange={(event) => setEmailUser(event.target.value)}
						/>
						<input
							type="password"
							name="password"
							placeholder="Digite o código da sala"
							onChange={(event) => setPasswordUser(event.target.value)}
						/>
						<button className="button" type="submit">
							Login
						</button>
						<p><a href="/sign">Criar conta</a></p>
					</form>
				</div>
			</main>
		</div>
	)
}
