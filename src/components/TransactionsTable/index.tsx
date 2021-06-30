import { FormEvent } from "react"
import { useTable } from "../../hooks/useTable"
import { database } from "../../services/firebase"

// style compoent
import { Container } from "./style"

export function TransactionsTable() {
	const { tables } = useTable()

	async function handleNewTransition(event: FormEvent) {
		event.preventDefault()

		const tableRef = database.ref("tables")

		await tableRef.push({
			title: "Site Vendido",
			price: "12,000",
			category: "Desenvolvimento",
			authorId: "kdklçaskdlçakslç",
		})
	}

	return (
		<Container>
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
			<form onSubmit={handleNewTransition}>
				<button type="submit">
					Criar tabela
				</button>
			</form>
		</Container>
	)
}
