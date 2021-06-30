import { useEffect, useState } from "react"
import { database } from "../services/firebase"

// Type
type QuestionType = {
  id: string | null,
  author: string,
  title: string,
  price: string,
  category: string,
  createdAt: string,
}

type firebaseTableTypes = Record<string, {
  authorId: string,
  title: string,
  price: string,
  category: string,
}>

// -------------------------------------------------
// Export Function
// -------------------------------------------------
export function useTable() {
	const [tables, setTables] = useState<QuestionType[]>([])

	useEffect(() => {
		const tableRef = database.ref("tables")

		tableRef.on("value", (room) => {
			const databaseTables = room.val()

			const firebaseTable: firebaseTableTypes = databaseTables ?? {}

			const parsedtable = Object.entries(firebaseTable).map(([key, value]) => {
				const toDateString = new Date().toDateString()
				const dateFormted = toDateString.substring(4)
				return {
					id: key,
					author: value.authorId,
					title: value.title,
					price: value.price,
					category: value.category,
					createdAt: dateFormted,
				}
			})
			setTables(parsedtable)
		})

		return () => {
			tableRef.off("value")
		}
	}, [])

	return { tables }
}
