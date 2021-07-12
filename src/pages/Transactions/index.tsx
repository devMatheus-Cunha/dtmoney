import { useState } from "react";
import { useParams } from "react-router-dom";

// components
import { Dashboard } from "../../components/Dashboard";
import { Header } from "../../components/Header";
import { NewTransactionModal } from "../../components/NewTransactionModal";
import { TransactionsTable } from "../../components/TransactionsTable";

import { GlobalStyle } from "../../assets/style/global";

// Type
type TransactionsParams = {
id: string
}

// -------------------------------------------------
// Export Function
// -------------------------------------------------
export function Transactions() {
	const params = useParams<TransactionsParams>()

  	// state
	const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

	function handleOpenNewTransaction() {
		setIsNewTransactionModalOpen(true)
	}

	function handleClosenNewTransaction() {
		setIsNewTransactionModalOpen(false)
	}

	// -------------------------------------------------
	// Render
	// -------------------------------------------------
	return (
		<>
			<Header onOpenNewTransaction={handleOpenNewTransaction} />
			<Dashboard />
			<NewTransactionModal
				isOpen={isNewTransactionModalOpen}
				onRequestClose={handleClosenNewTransaction}
			/>
			<TransactionsTable
				idTransaction={params.id}
			/>
			<GlobalStyle />
		</>
	)
}
