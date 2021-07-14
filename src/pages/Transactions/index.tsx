import { useState } from "react";
import { useParams } from "react-router-dom";

// contexts
import { TransactionsContext } from "../../contexts/TransactionsContext"

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
			<TransactionsContext.Provider value={[]}>
				<Header onOpenNewTransaction={handleOpenNewTransaction} />
				<Dashboard
					idTransactionRoute={params.id}
				/>
				<NewTransactionModal
					isOpen={isNewTransactionModalOpen}
					onRequestClose={handleClosenNewTransaction}
				/>
				<TransactionsTable
					idTransactionRoute={params.id}
				/>
				<GlobalStyle />
			</TransactionsContext.Provider>
		</>
	)
}
