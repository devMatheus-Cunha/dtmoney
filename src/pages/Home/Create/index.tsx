import {
	useCallback, useContext, useState,
} from "react";
import { toast } from "react-toastify";
import {
	useHistory,
} from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

// container
import { ToastNotification } from "../../../container/Toast"

// Images
import alertImg from "../../../images/alert-circle.svg"

// Style
import "../style.scss";

// Detabase
import { database } from "../../../services/firebase";
import { authConfig } from "../../../services/firebase";

// -------------------------------------------------
// Export Function
// -------------------------------------------------
export function Create() {
	const history = useHistory()
	const { setUserId } = useContext(AuthContext)
	const { user } = useContext(AuthContext)

	// State
	const [emailUser, setEmailUser] = useState("")
	const [passwordUser, setPasswordUser] = useState("")

	const signUpHandler = useCallback(
		async (event) => {
			event.preventDefault();
			const createTransaciton = await database.ref(`/transactions/${user?.id}`)
			try {
				await authConfig
					.auth()
					.createUserWithEmailAndPassword(emailUser, passwordUser);
				const data = {
					email: emailUser,
					password: passwordUser,
				}
				await createTransaciton.update(data)
				setUserId(user?.id)
				history.push("/")
			} catch (errors) {
				await toast.error(
					<ToastNotification
						type={alertImg}
						content="Já possui uma conta com estes dados"
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
		[emailUser, history, passwordUser, setUserId],
	);

	// -------------------------------------------------
	// Render
	// -------------------------------------------------
	return (
		<div id="page-auth">
			<main>
				<div className="main-content">
					<div className="separator">Criar tabela para controle financeiro</div>
					<form onSubmit={signUpHandler}>
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
							Criar
						</button>
						<p><a href="/">Fazer Login</a></p>
					</form>
				</div>
			</main>
		</div>
	)
}
