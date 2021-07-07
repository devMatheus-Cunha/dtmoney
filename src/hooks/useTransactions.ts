import { useEffect, useState } from "react"
import { database } from "../services/firebase"

// Type
type TransactionType = {
	id: string,
	title: string,
	price: string,
	category: string,
	type: string,
	createdAt: string,
}

type firebaseTransactionTypes = Record<string, {
	id: string,
	title: string,
	price: string,
	category: string,
	type: string,
}>

// -------------------------------------------------
// Export Function
// -------------------------------------------------
export function useTransactions(id: string) {
	const [transactions, setTransactions] = useState<TransactionType[]>([])

	useEffect(() => {
		const transactionRef = database.ref(`/transactions/${id}/newtransaction`)
		transactionRef.on("value", (room) => {
			const databasetransactions = room.val()
			const firebaseTransaction: firebaseTransactionTypes = databasetransactions ?? {}

			const parsedTransaction = Object.entries(firebaseTransaction).map(([key, value]) => {
				const toDateString = new Date().toDateString()
				const dateFormted = toDateString.substring(1)
				return {
					id: value.id,
					title: value.title,
					price: value.price,
					category: value.category,
					type: value.type,
					createdAt: dateFormted,
				}
			})
			setTransactions(parsedTransaction)
			console.log(parsedTransaction)
		})

		return () => {
			transactionRef.off("value")
		}
	}, [id])

	return { transactions }
}
