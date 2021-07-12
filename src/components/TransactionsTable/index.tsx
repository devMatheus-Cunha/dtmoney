import { FormEvent, useEffect, useState } from "react"
import Modal from "react-modal";
import ReactTooltip from "react-tooltip";
import { useContext } from "react";

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
  idTransactionRoute: string
}

// -------------------------------------------------
// Export Function
// -------------------------------------------------
export function TransactionsTable({
	idTransactionRoute,
}:TransactionsParams) {
	// hooks
	const { transactions } = useTransactions(idTransactionRoute)

	// State
	const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] = useState(false);
	const [deleteTransactionModalOpen, setDeleteTransactionModalOpen] = useState(false);
	const [idTransaction, setIdTransaction] = useState("");

	// open modal
	function handleOpenEditTransaction(id: string) {
		setIsEditTransactionModalOpen(true)
		setIdTransaction(id)
	}

	function handleOpenDeleteTransaction(id: string) {
		setDeleteTransactionModalOpen(true)
		setIdTransaction(id)
	}

	// functionw
	function handleClosenEditTransaction() {
		setIsEditTransactionModalOpen(false)
	}

	function handleClosedDeleteTransaction() {
		setDeleteTransactionModalOpen(false)
	}

	// -------------------------------------------------
	// Render
	// -------------------------------------------------
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
					idTransactionRoute={idTransactionRoute}
					idTransaction={idTransaction}
				/>
			</Modal>
			{
				transactions.length > 0 ? (
					<table>
						<thead>
							<tr key={idTransactionRoute}>
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
															data-tip="Deletar"
															data-delay-hide="100"
															data-type="error"
														>
															<img
																src={trashImage}
																alt="Lixeira"
															/>
														</button>
														<button
															type="button"
															onClick={() => handleOpenEditTransaction(value.id)}
															data-tip="Editar"
															data-delay-hide="100"
															data-type="warning"
														>
															<img src={editImage} alt="Editar" />
														</button>

													</td>
												</>
												<ReactTooltip
													effect="solid"
													className="TooltipStyle"
												/>
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
