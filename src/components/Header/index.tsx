// images
import ImageLogo from "../../images/logo.svg"

// style compoent
import { Container, Content } from "./style"

export function Header() {
	return (
		<Container>
			<Content>
				<img src={ImageLogo} alt="dt money" />
				<button type="button">
					Nova Transação
				</button>
			</Content>
		</Container>
	)
}
