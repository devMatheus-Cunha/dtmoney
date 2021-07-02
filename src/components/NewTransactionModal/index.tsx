/* eslint-disable no-alert */
import { useState, FormEvent } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";

// database
import { database } from "../../services/firebase"

// image
import closeImg from "../../images/close.svg"
import incomeImg from "../../images/income.svg"
import outcomeImg from "../../images/outcome.svg"
import alertImg from "../../images/alert-circle.svg"
import checkImg from "../../images/check.svg"

// style
import { Container, TransactionTypeContainer, RadioBox } from "./style"
import "react-toastify/dist/ReactToastify.css";

// const
import { ToastNotification } from "../../container/Toast"

// interface
interface NewTransactionModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
}

export function NewTransactionModal({
	isOpen, onRequestClose,
}: NewTransactionModalProps) {
	// state
	const [title, setTitle] = useState("")
	const [price, setPrice] = useState("")
	const [category, setCategory] = useState("")
	const [type, setType] = useState("")

	// Fucntions
	async function handleCreateNewTransaction(event: FormEvent) {
		event.preventDefault()

		const tableRef = database.ref("transacitons")

		const data = {
			id: "1",
			title,
			price,
			category,
			type,
		}

		const valuesTransactions = data.title.length && data.price.length && data.category.length && data.type.length

		if (valuesTransactions > 0) {
			toast.success(<ToastNotification
				type={checkImg}
				content="Transação adicionada com sucesso!"
			/>, {
				position: "top-right",
				autoClose: 3500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			await onRequestClose()
			tableRef.push(data)
		}

		if (valuesTransactions <= 0) {
			toast.warn(
				<ToastNotification
					type={alertImg}
					content="Preencha todos os campos"
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

		setTitle("")
		setPrice("")
		setCategory("")
		setType("")
	}

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
			<Container onSubmit={handleCreateNewTransaction}>
				<h2>Cadastrar transação</h2>
				<input
					type="text"
					placeholder="Título"
					// required
					onChange={(event) => setTitle(event.target.value)}
				/>
				<input
					type="number"
					placeholder="Valor"
					// required
					onChange={(event) => {
						const numberForStrint = event.target.value.toString()
						setPrice(numberForStrint)
					}}

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
					// required
					onChange={(event) => setCategory(event.target.value)}
				/>
				<button type="submit">
					Cadastrar
				</button>
			</Container>
		</Modal>
	)
}
