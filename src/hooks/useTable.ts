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
  title: string,
  price: string,
  category: string,
	type: string,
}>

// -------------------------------------------------
// Export Function
// -------------------------------------------------
export function useTransactions() {
	const [transacitons, setTransacitons] = useState<TransactionType[]>([])

	useEffect(() => {
		const transacitonRef = database.ref("transacitons")

		transacitonRef.on("value", (room) => {
			const databasetransacitons = room.val()

			const firebaseTransaciton: firebaseTransactionTypes = databasetransacitons ?? {}

			const parsedTransacion = Object.entries(firebaseTransaciton).map(([key, value]) => {
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
			setTransacitons(parsedTransacion)
		})

		return () => {
			transacitonRef.off("value")
		}
	}, [])

	return { transacitons }
}
