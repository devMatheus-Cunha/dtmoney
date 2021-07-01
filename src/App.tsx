import { useState } from "react";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
// components
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from "./components/NewTransactionModal";
// style
import { GlobalStyle } from "./style/global";

Modal.setAppElement("#root");

export function App() {
	// State
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
			<ToastContainer />
			<GlobalStyle />
		</>
	);
}
