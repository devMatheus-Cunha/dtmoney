/* eslint-disable max-len */
import { useState } from "react";
import Modal from "react-modal";
import { Tooltip } from "@material-ui/core";

// image
import trashImage from "../../assets/images/trash-2.svg";
import editImage from "../../assets/images/edit-2.svg";

// hooks
import { useTransactions } from "../../hooks/useTransactions";

// renderForm
import { RenderModalDelet } from "./items/delete";
import { RenderModalEdit } from "./items/edit";
import { RenderModalClearTable } from "./items/clearTable"
// style compoent
import { Container, ContainerInformation } from "./style";

// Type
type TransactionsParams = {
	idTransactionRoute: string
}

// -------------------------------------------------
// Export Function
// -------------------------------------------------
export function TransactionsTable({
	idTransactionRoute,
}: TransactionsParams) {
	// hooks
	const { transactions } = useTransactions(idTransactionRoute)

	// state
	const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] = useState(false);
	const [deleteTransactionModalOpen, setDeleteTransactionModalOpen] = useState(false);
	const [clearTableModalOpen, setClearTableModalOpen] = useState(false);
	const [idTransaction, setIdTransaction] = useState("");

	// open modal
	function handleOpenEditTransaction(id: string) {
		setIsEditTransactionModalOpen(true)
		setIdTransaction(id)
	}

	function handleOpenClearTable() {
		setClearTableModalOpen(true)
	}

	function handleOpenDeleteTransaction(id: string) {
		setDeleteTransactionModalOpen(true)
		setIdTransaction(id)
	}

	// close modal
	function handleClosenEditTransaction() {
		setIsEditTransactionModalOpen(false)
	}

	function handleClosedClearTable() {
		setClearTableModalOpen(false)
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
					idTransactionRoute={idTransactionRoute}
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
			<Modal
				isOpen={clearTableModalOpen}
				onRequestClose={handleClosedClearTable}
				overlayClassName="react-modal-overlay"
				className="react-modal-content"
			>
				<RenderModalClearTable
					onRequestClose={handleClosedClearTable}
					idTransactionRoute={idTransactionRoute}
				/>
			</Modal>
			{
				transactions.length > 0 ? (
					<>
						<ContainerInformation>
							<h3>Transações</h3>
							<div>
								<h3>
									{
										transactions.length === 1
											? `${transactions.length} item`
											: `${transactions.length} itens`
									}
								</h3>
								<button
									type="button"
									onClick={() => handleOpenClearTable()}
								>
									Limpar tabela
								</button>
							</div>
						</ContainerInformation>
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
												<>
													<tr key={value.id}>
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
															<Tooltip
																title="Deletar"
																placement="top"
																arrow
															>
																<button
																	type="button"
																	onClick={() => handleOpenDeleteTransaction(value.id)}
																>
																	<img
																		src={trashImage}
																		alt="Lixeira"
																	/>
																</button>
															</Tooltip>

															<Tooltip
																title="Editar"
																placement="top"
																arrow
															>
																<button
																	type="button"
																	onClick={() => handleOpenEditTransaction(value.id)}
																>
																	<img src={editImage} alt="Editar" />
																</button>
															</Tooltip>

														</td>
													</tr>
												</>
											)
										})
									}
								</>
							</tbody>
						</table>
						<div className="styleScreen">
							{transactions.map((value) => {
								return (
									<div key={value.id} className="contentTransactions">
										<div className="styleTitle">{value.title}</div>
										<div className="action">
											<Tooltip
												title="Deletar"
												placement="top"
												arrow
											>
												<button
													type="button"
													onClick={() => handleOpenDeleteTransaction(value.id)}
												>
													<img
														src={trashImage}
														alt="Lixeira"
													/>
												</button>
											</Tooltip>

											<Tooltip
												title="Editar"
												placement="top"
												arrow
											>
												<button
													type="button"
													onClick={() => handleOpenEditTransaction(value.id)}
												>
													<img src={editImage} alt="Editar" />
												</button>
											</Tooltip>
										</div>
										<div className={`${value.type} stylePrice`}>
											{" "}
											{
												new Intl.NumberFormat("pt-BR", {
													style: "currency",
													currency: "BRL",
												}).format(value.price as unknown as number)
											}
										</div>
										<div className="styleCategory">{value.category}</div>
										<div className="styleCreatedAt">
											{" "}
											{new Intl.DateTimeFormat("pt-BR").format(
												new Date(value.createdAt),
											)}
										</div>
									</div>
								)
							})}
						</div>
					</>
				) : (
					<>
						<h3>Nenhuma transação foi adicionada até o momento.</h3>

					</>
				)
			}
		</Container>

	)
}
