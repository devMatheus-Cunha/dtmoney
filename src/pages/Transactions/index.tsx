import { useState } from "react";

// components
import { Dashboard } from "../../components/Dashboard";
import { Header } from "../../components/Header";
import { NewTransactionModal } from "../../components/NewTransactionModal";
import { TransactionsTable } from "../../components/TransactionsTable";

import { GlobalStyle } from "../../assets/style/global";

export function Transactions() {
  	// state
	const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

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
