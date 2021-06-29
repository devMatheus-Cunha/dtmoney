import { useEffect, useState } from "react"
import { database } from "../../services/firebase"

// Type
type QuestionType = {
  id: string,
  author: string,
  title: string,
  value: string,
  category: string,
}

type firebaseTableTypes = Record<string, {
  author: string,
  title: string,
  value: string,
  category: string,
}>

// -------------------------------------------------
// Export Function
// -------------------------------------------------
export function useRoom(tableId: string) {
	// State
	const [tables, setTables] = useState<QuestionType[]>([])

	useEffect(() => {
		const roomRef = database.ref(`tables/${tableId}`)

		roomRef.on("value", (room) => {
			const databaseTables = room.val()
			const firebaseTable: firebaseTableTypes = databaseTables.tables ?? {}

			const parsedtable = Object.entries(firebaseTable).map(([key, value]) => {
				return {
					id: key,
					author: value.author,
					title: value.title,
					value: value.value,
					category: value.category,
				}
			})
			setTables(parsedtable)
		})

		return () => {
			roomRef.off("value")
		}
	}, [tableId])

	return { tables }
}
