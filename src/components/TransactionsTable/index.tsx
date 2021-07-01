/* eslint-disable max-len */
import { useTransactions } from "../../hooks/useTable"

// style compoent
import { Container } from "./style"

export function TransactionsTable() {
	// Hooks
	const { transacitons } = useTransactions()

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
