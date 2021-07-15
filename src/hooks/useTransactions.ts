import { useEffect, useState } from "react"

// firebase
import { database } from "../services/firebase"

// Type
type TransactionType = {
	id: string,
	title: string,
	price: number,
	category: string,
	type: string,
	createdAt: string,
}

type firebaseTransactionTypes = Record<string, {
	title: string,
	price: string,
	category: string,
	type: string,
	createdAt: string
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
				const valuePriceNumber = parseInt(value.price, 10)
				return {
					id: key,
					title: value.title,
					price: valuePriceNumber,
					category: value.category,
					type: value.type,
					createdAt: value.createdAt,
				}
			})
			setTransactions(parsedTransaction)
		})

		return () => {
			transactionRef.off("value")
		}
	}, [id])

	return { transactions }
}
