import { FormEvent, useEffect, useState } from "react"
import { database } from "../../services/firebase"
import { useRoom } from "../hooks/useRoom";

// style compoent
import { Container } from "./style"

export function TransactionsTable() {
	const { tables } = useRoom("-MdOEkma0tXZvWzZTifI")

	useEffect(() => {
	console.log(tables)
	}, [])

	async function handleNewTransition(event: FormEvent) {
		event.preventDefault()

		const roomRef = database.ref("tables")

		await roomRef.push({
			title: "Site Vendido",
			value: "12,000",
			category: "Desenvolvimento",
			date: new Date(),
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
					{
						tables.map((table) => {
							return (
								<>
									<tr>
										<td>{table.title}</td>
										<td className="deposit">{`R$ ${table.value}`}</td>
										<td>{table.category}</td>
										<td>20/12/2020</td>
									</tr>
								</>
							)
						})
					}
				</tbody>
			</table>
			<form onSubmit={handleNewTransition}>
				<button type="submit">
					Criar sala
				</button>
			</form>
		</Container>
	)
}
