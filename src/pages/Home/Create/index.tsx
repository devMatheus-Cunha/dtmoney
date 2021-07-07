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

// Detabase
import { database } from "../../../services/firebase";
import { authConfig } from "../../../services/firebase";

// images
import logo from "../../../assets/images/logo.svg";
import alertImg from "../../../assets/images/alert-circle.svg"

/// style
import {
	Container, Wrapper, ContainerSideBar, LogoWrapper, Form, StyledInput, ContainerInput,
} from "../style";

// -------------------------------------------------
// Export Function
// -------------------------------------------------
export function Create() {
	const history = useHistory()
	const { setUserId } = useContext(AuthContext)
	const { user } = useContext(AuthContext)

	// State
	const [nameUser, setNameUser] = useState("")
	const [emailUser, setEmailUser] = useState("")
	const [passwordUser, setPasswordUser] = useState("")

	const signUpHandler = useCallback(
		async (event) => {
			event.preventDefault();
			const createTransaciton = await database.ref("/transactions")
			try {
				await authConfig
					.auth()
					.createUserWithEmailAndPassword(emailUser, passwordUser);
				const data = {
					user: nameUser,
					email: emailUser,
					password: passwordUser,
				}
				await createTransaciton.push(data)
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
		[emailUser, history, nameUser, passwordUser],
	);

	// -------------------------------------------------
	// Render
	// -------------------------------------------------
	return (
		<>
			<Container>
				<Wrapper>
					<ContainerSideBar>
						<LogoWrapper>
							<img src={logo} alt="" />
						</LogoWrapper>
						<Form onSubmit={signUpHandler}>
							<h3>Criar Conta</h3>
							<ContainerInput>
								<StyledInput
									placeholder="Digite seu nome..."
									type="text"
									onChange={(event) => setNameUser(event.target.value)}
								/>
								<StyledInput
									placeholder="Digite seu email..."
									type="email"
									onChange={(event) => setEmailUser(event.target.value)}
								/>

								<StyledInput
									placeholder="Digite sua senha..."
									type="password"
									onChange={(event) => setPasswordUser(event.target.value)}
								/>
							</ContainerInput>
							<button type="submit">Criar</button>
						</Form>
						<div>
							<h4>
								Já possui uma conta?
								{" "}
								<a href="/"><span>Fazer Login</span></a>
							</h4>
						</div>
					</ContainerSideBar>

				</Wrapper>
			</Container>
		</>
	)
}
