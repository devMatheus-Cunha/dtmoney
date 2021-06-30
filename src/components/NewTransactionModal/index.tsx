import Modal from "react-modal";

// style compoent
import { Container } from "./style"

// interface
interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
	isOpen, onRequestClose,
}:NewTransactionModalProps) {
	return (
		<Container>
			<Modal
				isOpen={isOpen}
				onRequestClose={onRequestClose}
				contentLabel="Example Modal"
			>
				<h2>Cadastrar transação</h2>
			</Modal>
		</Container>
	)
}
