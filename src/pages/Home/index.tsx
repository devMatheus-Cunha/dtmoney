import {
	FormEvent, useCallback, useState,
} from "react";
import { toast } from "react-toastify";
import {
	useHistory,
} from "react-router-dom";

// container
import { ToastNotification } from "../../container/Toast"

// Images
import alertImg from "../../images/alert-circle.svg"

// Style
import "./style.scss";

// Detabase
import { database } from "../../services/firebase";
import { authConfig } from "../../services/firebase";

// -------------------------------------------------
// Export Function
// -------------------------------------------------
export function Home() {
	const history = useHistory()

	// State
	const [emailUser, setEmailUser] = useState("")
	const [passwordUser, setPasswordUser] = useState("")

	const signUpHandler = useCallback(
		async (event) => {
			event.preventDefault();
			const createTransaciton = await database.ref("transacitons")
			try {
				await authConfig
					.auth()
					.createUserWithEmailAndPassword(emailUser, passwordUser);
				const firebaseTransactions = await createTransaciton.push({
					email: emailUser,
					password: passwordUser,
				})
				history.push(`/transacitons/${firebaseTransactions.key}`)
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
		[emailUser, history, passwordUser],
	);

	// const loginHandler = useCallback(
	// 	async (event) => {
	// 		event.preventDefault();

	// 		try {
	// 			await authConfig
	// 				.auth()
	// 				.signInWithEmailAndPassword(emailUser, passwordUser);
	// 			history.push("/");
	// 			console.log("Login");
	// 		} catch (error) {
	// 			toast.error(
	// 				<ToastNotification
	// 					type={alertImg}
	// 					content="Dados informados estão incorretos!"
	// 				/>, {
	// 					position: "top-right",
	// 					autoClose: 3000,
	// 					hideProgressBar: false,
	// 					closeOnClick: true,
	// 					pauseOnHover: true,
	// 					draggable: true,
	// 					progress: undefined,
	// 				},
	// 			);
	// 		}
	// 		console.log("Login");
	// 	},
	// 	[emailUser, history, passwordUser],
	// );

	// const { user } = useContext(AuthContext);
	// if (user) {
	// 	return <Redirect to="/" />;
	// }

	// -------------------------------------------------
	// Render
	// -------------------------------------------------
	return (
		<div id="page-auth">
			<main>
				<div className="main-content">
					<div className="separator">Crie tabela para controle financeiro</div>
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
					</form>
				</div>
			</main>
		</div>
	)
}
