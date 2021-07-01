import { useTable } from "../../hooks/useTable"

// style compoent
import { Container } from "./style"

export function TransactionsTable() {
	// Hooks
	const { tables } = useTable()

	return (
		<Container>
			{
				tables.length > 0 ? (
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
									tables.map((table) => {
										return (
											<tr key={table.id}>
												<>
													<td>{table.title}</td>
													<td className="deposit">{`R$ ${table.price}`}</td>
													<td>{table.category}</td>
													<td>{table.createdAt}</td>
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
