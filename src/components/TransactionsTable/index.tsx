/* eslint-disable max-len */
import { useState } from "react"
import Modal from "react-modal";
import { toast } from "react-toastify"

// hooks
import { useTransactions } from "../../hooks/useTable"

// renderForm
import { RenderModal } from "./items/form"

// style compoent
import { Container } from "./style"

// container
import { ToastNotification } from "../../container/Toast"

// database
import { database } from "../../services/firebase"

// image
import trashImage from "../../images/trash-2.svg"
import editImage from "../../images/edit-2.svg"
import checkImg from "../../images/check.svg"

export function TransactionsTable() {
	// hooks
	const { transacitons } = useTransactions()

	// State
	const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
	const [idTransaciton, setIdTransacitons] = useState("")

	// open modal
	function handleOpenNewTransaction(id: string) {
		setIsNewTransactionModalOpen(true)
		setIdTransacitons(id)
	}

	function handleClosenNewTransaction() {
		setIsNewTransactionModalOpen(false)
	}

	// functionw
	 async function handleDeleteTransaction(transacitonId: string) {
		 toast.success(<ToastNotification
			type={checkImg}
			content="Transação excluida com sucesso!"
		 />, {
			position: "top-right",
			autoClose: 3500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
		await database.ref(`transacitons/${transacitonId}/`).remove()
	}

	return (
		<Container>
			<Modal
				isOpen={isNewTransactionModalOpen}
				onRequestClose={handleClosenNewTransaction}
				overlayClassName="react-modal-overlay"
				className="react-modal-content"
			>
				<RenderModal
					onRequestClose={handleClosenNewTransaction}
					idTransaciton={idTransaciton}
				/>
			</Modal>
			{
				transacitons.length > 0 ? (
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
									transacitons.map((value) => {
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
															onClick={() => handleDeleteTransaction(value.id)}
														>
															<img
																src={trashImage}
																alt="Lixeira"
															/>
														</button>
														<button
															type="button"
															onClick={() => handleOpenNewTransaction(value.id)}

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
					<h3>Nenhum dado foi adicionado até o momento</h3>
				)
			}
		</Container>

	)
}
