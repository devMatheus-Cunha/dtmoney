/* eslint-disable max-len */
import {
	useCallback, useContext, useState,
} from "react";
import { Redirect, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import firebase from "firebase";
import { AuthContext } from "../../contexts/AuthContext";

// container
import { ToastNotification } from "../../container/Toast"

// detabase
import { authConfig } from "../../services/firebase";

// images
import alertImg from "../../assets/images/alert-circle.svg"
import logo from "../../assets/images/logo.svg";
import banner from "../../assets/images/banner.svg";
import checkImg from "../../assets/images/check.svg"

// style
import {
	Container, Wrapper, ContainerSideBar, LogoWrapper, Form, StyledInput, ContainerInput,
} from "./style";

// -------------------------------------------------
// Export Function
// -------------------------------------------------
export function Home() {
	const history = useHistory()
	const { user } = useContext(AuthContext)

	const [recoverPassowd, setRecoverPassowd] = useState(true)

	// State
	const [emailUser, setEmailUser] = useState<string>("")
	const [passwordUser, setPasswordUser] = useState<string>("")

	const loginHandler = useCallback(
		async (event) => {
			event.preventDefault();

			try {
				await authConfig
					.auth()
					.signInWithEmailAndPassword(emailUser, passwordUser)
					.then(() => {
						toast.success(
							<ToastNotification
								type={checkImg}
								content="Login feito com sucesso!"
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
						history.push(`/transactions/${user.id}`)
					})
			} catch (error) {
				if (error.message === ("There is no user record corresponding to this identifier. The user may have been deleted.")) {
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
				if (error.message === "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.") {
					toast.error(
						<ToastNotification
							type={alertImg}
							content="Senha informada esta incorreta!"
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
			}
		},
		[emailUser, history, passwordUser, user?.id],
	);

	// functions
	const reset = useCallback(
		async (event) => {
			event.preventDefault();
			firebase.auth().sendPasswordResetEmail(emailUser)
				.then(() => {
					if (passwordUser.length > 0) {
						toast.success(
							<ToastNotification
								type={checkImg}
								content="Acesse seu email para redefinir sua senha!"
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
				})
				.catch(() => {
					toast.error(
						<ToastNotification
							type={checkImg}
							content="Este email não existe no sistema!"
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
				});
		},
		[emailUser, passwordUser.length],
	);

	if (user) {
		return <Redirect to={`/transactions/${user.id}`} />
	}

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
							{
								recoverPassowd ? (
									<>
										<h3>Fazer Login</h3>
										<ContainerInput>
											<p>E-mail*</p>
											<StyledInput
												placeholder="Digite seu email..."
												type="email"
												required
												onChange={(event) => setEmailUser(event.target.value)}
											/>
											<div>
												<p>Senha*</p>
												<button type="button" onClick={() => setRecoverPassowd(false)}>Redefinir senha</button>
											</div>
											<StyledInput
												placeholder="Digite sua senha..."
												type="password"
												required
												onChange={(event) => setPasswordUser(event.target.value)}
											/>
											<button type="submit">Login</button>
										</ContainerInput>
									</>
								) : (
									<>
										<h3>Esqueceu sua senha?</h3>
										<h4>Digite seu e-mail para recuperar sua senha.</h4>
										<ContainerInput>
											<div>
												<p>E-mail*</p>
												<button type="button" onClick={() => setRecoverPassowd(true)}>Login</button>
											</div>
											<StyledInput
												placeholder="Digite seu email..."
												type="email"
												required
												onChange={(event) => setEmailUser(event.target.value)}
											/>
											<button type="submit" onClick={reset}>Redefinir</button>
										</ContainerInput>
									</>
								)
							}
						</Form>
						<div>
							<h4>
								Ainda não possui uma conta?
								{" "}
								<a href="/sign"><span>Crie Aqui</span></a>
							</h4>
						</div>
					</ContainerSideBar>
					<img src={banner} alt="" />
				</Wrapper>
			</Container>
		</>
	)
}
