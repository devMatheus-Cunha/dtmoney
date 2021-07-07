import { useState } from "react"
import Modal from "react-modal";
import { useParams } from "react-router-dom";

// hooks
import { useTransactions } from "../../hooks/useTransactions"

// renderForm
import { RenderModalEdit } from "./items/edit"
import { RenderModalDelet } from "./items/delete"

// style compoent
import { Container } from "./style"

// image
import trashImage from "../../assets/images/trash-2.svg"
import editImage from "../../assets/images/edit-2.svg"

// Type
type TransactionsParams = {
  id: string
}

export function TransactionsTable() {
	const params = useParams<TransactionsParams>()

	// hooks
	const { transactions } = useTransactions(params.id)

	// State
	const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] = useState(false);
	const [deleteTransactionModalOpen, setDeleteTransactionModalOpen] = useState(false);
	const [idTransaction, setIdTransactions] = useState("")

	// open modal
	function handleEditTransaction(id: string) {
		setIsEditTransactionModalOpen(true)
		setIdTransactions(id)
	}

	function handleClosenEditTransaction() {
		setIsEditTransactionModalOpen(false)
	}

	// functionw
	function handleOpenDeleteTransaction(id: string) {
		setDeleteTransactionModalOpen(true)
		setIdTransactions(id)
	}

	function handleClosedDeleteTransaction() {
		setDeleteTransactionModalOpen(false)
	}

	return (
		<Container>
			<Modal
				isOpen={isEditTransactionModalOpen}
				onRequestClose={handleClosenEditTransaction}
				overlayClassName="react-modal-overlay"
				className="react-modal-content"
			>
				<RenderModalEdit
					onRequestClose={handleClosenEditTransaction}
					idTransaction={idTransaction}
				/>
			</Modal>
			<Modal
				isOpen={deleteTransactionModalOpen}
				onRequestClose={handleClosedDeleteTransaction}
				overlayClassName="react-modal-overlay"
				className="react-modal-content"
			>
				<RenderModalDelet
					onRequestClose={handleClosedDeleteTransaction}
					idTransaction={idTransaction}
				/>
			</Modal>
			{
				transactions.length > 0 ? (
					<table>
						<thead>
							<tr>
								<th>Título</th>
								<th>Valor</th>
								<th>Categoria</th>
								<th>Data</th>
								<th>Ação</th>
							</tr>
						</thead>

						<tbody>
							<>
								{
									transactions.map((value) => {
										return (
											<tr key={value.id}>
												<>
													<td>{value.title}</td>
													<td className={value.type}>
														{
															new Intl.NumberFormat("pt-BR", {
																style: "currency",
																currency: "BRL",
															}).format(value.price as unknown as number)
														}
													</td>
													<td>{value.category}</td>
													<td>
														{new Intl.DateTimeFormat("pt-BR").format(
															new Date(value.createdAt),
														)}
													</td>
													<td className="action">
														<button
															type="button"
															onClick={() => handleOpenDeleteTransaction(value.id)}
														>
															<img
																src={trashImage}
																alt="Lixeira"
															/>
														</button>
														<button
															type="button"
															onClick={() => handleEditTransaction(value.id)}
														>
															<img src={editImage} alt="Editar" />
														</button>
													</td>
												</>
											</tr>
										)
									})
								}
							</>
						</tbody>
					</table>
				) : (
					<>
						<h3>Nenhum dado foi adicionado até o momento</h3>

					</>
				)
			}
		</Container>

	)
}
