import { useState, useEffect, FormEvent } from "react";
import { toast } from "react-toastify";

// database
import { database } from "../../../services/firebase"

// image
import closeImg from "../../../assets/images/close.svg"
import incomeImg from "../../../assets/images/income.svg"
import outcomeImg from "../../../assets/images/outcome.svg"
import checkImg from "../../../assets/images/check.svg"

// style
import { Container, TransactionTypeContainer, RadioBox } from "../../NewTransactionModal/style"
import "react-toastify/dist/ReactToastify.css";

// container
import { ToastNotification } from "../../../container/Toast"

// interface
interface NewTransactionModalProps {
	onRequestClose: () => void;
	idTransactionRoute: string;
	idTransaction: string
}

// -------------------------------------------------
// Export Function
// -------------------------------------------------
export function RenderModalEdit({
	onRequestClose, idTransactionRoute, idTransaction,
}: NewTransactionModalProps) {
	// state
	const [title, setTitle] = useState("")
	const [price, setPrice] = useState("")
	const [category, setCategory] = useState("")
	const [type, setType] = useState("")
	const [transactionsDatas, setTransactionsDatas] = useState<any>([]);

	useEffect(() => {
		const transactionRef = database.ref(`transactions/${idTransactionRoute}/newtransaction/${idTransaction}`)

		transactionRef.on("value", (room) => {
			const databaseTransactions = room.val()
			setTransactionsDatas(databaseTransactions)
		})

		return () => {
			transactionRef.off("value")
		}
	}, [idTransaction, idTransactionRoute])

	// Functions
	async function handleEditTransaciton(event: FormEvent) {
		event.preventDefault()

		await database.ref(`transactions/${idTransactionRoute}/newtransaction/${idTransaction}`).update({
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

	// -------------------------------------------------
	// Render
	// -------------------------------------------------
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
