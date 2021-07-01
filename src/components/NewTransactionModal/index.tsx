import { useState } from "react";
import Modal from "react-modal";

// image
import closeImg from "../../images/close.svg"
import incomeImg from "../../images/income.svg"
import outcomeImg from "../../images/outcome.svg"

// style compoent
import { Container, TransactionTypeContainer, RadioBox } from "./style"

// interface
interface NewTransactionModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
}

export function NewTransactionModal({
	isOpen, onRequestClose,
}: NewTransactionModalProps) {
	// state
	const [type, setType] = useState("deposit")

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			overlayClassName="react-modal-overlay"
			className="react-modal-content"
		>
			<button
				type="button"
				onClick={onRequestClose}
				className="react-modal-close"
			>
				<img src={closeImg} alt="Fechar modal" />
			</button>
			<Container>
				<h2>Cadastrar transação</h2>
				<input
					type="text"
					placeholder="Título"
				/>
				<input
					type="number"
					placeholder="Valor"
				/>

				<TransactionTypeContainer>
					<RadioBox
						type="button"
						onClick={() => setType("deposit")}
						isActive={type === "deposit"}
						activeColor="green"
					>
						<img src={incomeImg} alt="" />
						<span>Entrada</span>
					</RadioBox>

					<RadioBox
						type="button"
						onClick={() => setType("withdraw")}
						isActive={type === "withdraw"}
						activeColor="red"
					>
						<img src={outcomeImg} alt="" />
						<span>Saída</span>
					</RadioBox>

				</TransactionTypeContainer>

				<input
					type="text"
					placeholder="Categoria"
				/>
				<button type="submit">
					Cadastrar
				</button>
			</Container>
		</Modal>
	)
}
