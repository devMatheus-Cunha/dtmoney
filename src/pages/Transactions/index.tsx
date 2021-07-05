import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// components
import { Dashboard } from "../../components/Dashboard";
import { Header } from "../../components/Header";
import { NewTransactionModal } from "../../components/NewTransactionModal";
import { TransactionsTable } from "../../components/TransactionsTable";
import { AuthContext } from "../../contexts/AuthContext";

import { GlobalStyle } from "../../style/global";

type TransactionsParams = {
  id: string
}

export function Transactions() {
	const { user } = useContext(AuthContext)

  	// state
	const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
	const params = useParams<TransactionsParams>()
	const [idTransaciton, setIdTransaciton] = useState("")

	useEffect(() => {
		setIdTransaciton(params.id)
	}, [params.id])

	function handleOpenNewTransaction() {
		setIsNewTransactionModalOpen(true)
	}

	function handleClosenNewTransaction() {
		setIsNewTransactionModalOpen(false)
	}
	return (
		<>
			<Header onOpenNewTransaction={handleOpenNewTransaction} />
			<Dashboard />
			<NewTransactionModal
				isOpen={isNewTransactionModalOpen}
				onRequestClose={handleClosenNewTransaction}
			/>
			<TransactionsTable />
			<GlobalStyle />
		</>
	)
}
