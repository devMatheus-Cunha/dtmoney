// Image
import ImageLogo from "../../assets/images/logoTransaction.svg"

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
