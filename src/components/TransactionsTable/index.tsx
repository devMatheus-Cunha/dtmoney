/* eslint-disable max-len */
import { toast } from "react-toastify"
import { useTransactions } from "../../hooks/useTable"

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

	// functions
	 async function handleDeleteQuesiton(transacitonId: string) {
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
															onClick={() => handleDeleteQuesiton(value.id)}
														>
															<img
																src={trashImage}
																alt="Lixeira"
															/>
														</button>
														<button type="button">
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
