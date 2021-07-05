import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
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
	title: string,
	price: string,
	category: string,
	type: string,
}>

type TransactionsParams = {
  id: string
}

// -------------------------------------------------
// Export Function
// -------------------------------------------------
export function useTransactions() {
	const params = useParams<TransactionsParams>()
	const [transactions, setTransactions] = useState<TransactionType[]>([])

	useEffect(() => {
		const transactionRef = database.ref("/transacitons/-MdnrCrj6RL79SBgt6zw/newtransaction")
		// const transactionRef = database.ref(`/transacitons/${params.id}`)

		transactionRef.on("value", (room) => {
			const databasetransactions = room.val()
			const firebaseTransaction: firebaseTransactionTypes = databasetransactions ?? {}

			const parsedTransaction = Object.entries(firebaseTransaction).map(([key, value]) => {
				const toDateString = new Date().toDateString()
				const dateFormted = toDateString.substring(1)
				return {
					id: key,
					title: value.title,
					price: value.price,
					category: value.category,
					type: value.type,
					createdAt: dateFormted,
				}
			})
			setTransactions(parsedTransaction)
		})

		return () => {
			transactionRef.off("value")
		}
	}, [])

	return { transactions }
}
