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

	const summary = transactions.reduce((acc, transaction) => {
		if (transaction.type === "deposit") {
			acc.deposits += transaction.price;
			acc.total += transaction.price;
		} else {
			acc.withdraw += transaction.price;
			acc.total -= transaction.price;
		}
		return acc
	}, {
		deposits: 0,
		withdraw: 0,
		total: 0,
	})

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
				<strong>
					{
						new Intl.NumberFormat("pt-BR", {
							style: "currency",
							currency: "BRL",
						}).format(summary.deposits as unknown as number)
					}
				</strong>
			</div>

			<div>
				<header>
					<p>Saídas</p>
					<img src={outcomeImg} alt="Saídas" />
				</header>
				<strong>
					-
					{
						new Intl.NumberFormat("pt-BR", {
							style: "currency",
							currency: "BRL",
						}).format(summary.withdraw as unknown as number)
					}
				</strong>
			</div>

			<div className="highlight-background">
				<header>
					<p>Total</p>
					<img src={totalImg} alt="Entradas" />
				</header>
				<strong>
					{
						new Intl.NumberFormat("pt-BR", {
							style: "currency",
							currency: "BRL",
						}).format(summary.total as unknown as number)
					}
				</strong>
			</div>
		</Container>
	)
}
