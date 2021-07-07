import { useHistory } from "react-router-dom";
import {
	useCallback, useContext, useState,
} from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";

// container
import { ToastNotification } from "../../container/Toast"

// images
import alertImg from "../../assets/images/alert-circle.svg"
import logo from "../../assets/images/logo.svg";

// style
import {
	Container, Wrapper, ContainerSideBar, LogoWrapper, Form, StyledInput, ContainerInput,
} from "./style";

// detabase
import { authConfig } from "../../services/firebase";

// -------------------------------------------------
// Export Function
// -------------------------------------------------
export function Home() {
	const history = useHistory()
	const { setUser } = useContext(AuthContext)

	// State
	const [emailUser, setEmailUser] = useState<string>("")
	const [passwordUser, setPasswordUser] = useState<string>("")
	const [isLogginActive, setIsLogginActive] = useState(true)

	const loginHandler = useCallback(
		async (event) => {
			event.preventDefault();

			try {
				await authConfig
					.auth()
					.signInWithEmailAndPassword(emailUser, passwordUser);
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
		[emailUser, passwordUser],
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
						<Form onSubmit={loginHandler}>
							<h3>Fazer Login</h3>
							<ContainerInput>
								<StyledInput
									placeholder="Digite seu email..."
									type="email"
									required
									onChange={(event) => setEmailUser(event.target.value)}
								/>

								<StyledInput
									placeholder="Digite sua senha..."
									type="password"
									required
									onChange={(event) => setPasswordUser(event.target.value)}
								/>
							</ContainerInput>

							<button type="submit">Login</button>
						</Form>
						<div>
							<h4>
								Ainda não possui uma conta?
								{" "}
								<a href="/sign"><span>Crie Aqui</span></a>
							</h4>
						</div>
					</ContainerSideBar>
				</Wrapper>
			</Container>
		</>
	)
}
