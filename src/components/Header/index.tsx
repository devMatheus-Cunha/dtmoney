// Image
import { FormEvent } from "react";
import { useHistory } from "react-router-dom";
import ImageLogo from "../../assets/images/logoTransaction.svg"
import { authConfig } from "../../services/firebase"

// style compoent
import { Container, Content } from "./style"

// type
type HeanderProps = {
	onOpenNewTransaction: () => void;
}

export function Header({
	onOpenNewTransaction,
}: HeanderProps) {
	const history = useHistory()

	const deslogar = () => {
		authConfig
			.auth().signOut().then(() => {
				history.push("/")
			}).catch((error) => {
				console.log(error)
			});
	}

	return (
		<Container>
			<Content>
				<img src={ImageLogo} alt="dt money" />
				<div>
					<button type="button" onClick={onOpenNewTransaction}>
						Nova Transação
					</button>
					<button
						type="button"
						onClick={deslogar}
					>
						Sair
					</button>
				</div>
			</Content>
		</Container>
	)
}
