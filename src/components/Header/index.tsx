// Image
import ImageLogo from "../../images/logo.svg"

// style compoent
import { Container, Content } from "./style"

// type
type HeanderProps = {
	onOpenNewTransaction: () => void;
}

export function Header({
	onOpenNewTransaction,
}: HeanderProps) {
	return (
		<Container>
			<Content>
				<img src={ImageLogo} alt="dt money" />
				<button type="button" onClick={onOpenNewTransaction}>
					Nova Transação
				</button>
			</Content>
		</Container>
	)
}
