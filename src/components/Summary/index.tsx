import React from "react"

// style compoent
import { Container } from "./style"

// image
import incomeImg from "../../assets/images/income.svg"
import outcomeImg from "../../assets/images/outcome.svg"
import totalImg from "../../assets/images/total.svg"

import { useTransactions } from "../../hooks/useTransactions"

// Type
type TransactionsParams = {
	idTransactionRoute: string
	}

// -------------------------------------------------
// Export Function
// -------------------------------------------------
export function Summary({
	idTransactionRoute,
}: TransactionsParams) {
	const { transactions } = useTransactions(idTransactionRoute)

	// -------------------------------------------------
	// Render
	// -------------------------------------------------
	return (
		<Container>
			<div>
				<header>
					<p>Entradas</p>
					<img src={incomeImg} alt="Entradas" />
				</header>
				<strong>R$1000</strong>
			</div>

			<div>
				<header>
					<p>Saídas</p>
					<img src={outcomeImg} alt="Saídas" />
				</header>
				<strong>-R$1000</strong>
			</div>

			<div className="highlight-background">
				<header>
					<p>Total</p>
					<img src={totalImg} alt="Entradas" />
				</header>
				<strong>R$500</strong>
			</div>
		</Container>
	)
}
