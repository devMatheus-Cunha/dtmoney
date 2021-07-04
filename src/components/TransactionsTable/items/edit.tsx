import { useState, useEffect, FormEvent } from "react";
import { toast } from "react-toastify";

// database
import { database } from "../../../services/firebase"

// image
import closeImg from "../../../images/close.svg"
import incomeImg from "../../../images/income.svg"
import outcomeImg from "../../../images/outcome.svg"
import checkImg from "../../../images/check.svg"

// style
import { Container, TransactionTypeContainer, RadioBox } from "../../NewTransactionModal/style"
import "react-toastify/dist/ReactToastify.css";

// container
import { ToastNotification } from "../../../container/Toast"
// interface
interface NewTransactionModalProps {
	onRequestClose: () => void;
	idTransaction: string;
}

export function RenderModalEdit({
	onRequestClose, idTransaction,
}: NewTransactionModalProps) {
	// state
	const [title, setTitle] = useState("")
	const [price, setPrice] = useState("")
	const [category, setCategory] = useState("")
	const [type, setType] = useState("")
	const [transactionsDatas, setTransactionsDatas] = useState<any>([]);

	useEffect(() => {
		const transacitonRef = database.ref(`transactions/${idTransaction}`)

		transacitonRef.on("value", (room) => {
			const databaseTransactions = room.val()
			setTransactionsDatas(databaseTransactions)
		})

		return () => {
			transacitonRef.off("value")
		}
	}, [idTransaction])

	// Fucntions
	async function handleEditTransaciton(event: FormEvent) {
		event.preventDefault()

		await database.ref(`transactions/${idTransaction}/`).update({
			title: title || transactionsDatas.title,
			price: price || transactionsDatas.price,
			category: category || transactionsDatas.category,
			type: type || transactionsDatas.type,
		})

		toast.success(<ToastNotification
			type={checkImg}
			content="Transação editada com sucesso!"
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
	}

	return (
		<>
			<button
				type="button"
				onClick={onRequestClose}
				className="react-modal-close"
			>
				<img src={closeImg} alt="Fechar modal" />
			</button>

			<Container onSubmit={handleEditTransaciton}>
				<h2>Editar transação</h2>
				<input
					type="text"
					placeholder="Título"
					onChange={(event) => {
						const { value } = event.target
						if (value.length > 0) {
							setTitle(value)
						} else {
							setTitle(" ")
						}
					}}
					value={title || transactionsDatas.title}

				/>
				<input
					type="number"
					placeholder="Valor"
					onChange={(event) => {
						const numberForStrint = event.target.value.toString()
						if (numberForStrint.length > 0) {
							setPrice(numberForStrint)
						} else {
							setPrice(" ")
						}
					}}
					value={price || transactionsDatas.price}
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
					onChange={(event) => {
						const { value } = event.target
						if (value.length > 0) {
							setCategory(value)
						} else {
							setCategory(" ")
						}
					}}
					value={category || transactionsDatas.category}
				/>
				<button type="submit">
					Cadastrar
				</button>
			</Container>

		</>
	)
}
