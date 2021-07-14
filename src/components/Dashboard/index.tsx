// components
import { Summary } from "../Summary"

// style compoent
import { Container } from "./style"

// Type
type TransactionsParams = {
	idTransactionRoute: string
	}

// -------------------------------------------------
// Export Function
// -------------------------------------------------
export function Dashboard({
	idTransactionRoute,
}: TransactionsParams) {
	// -------------------------------------------------
	// Render
	// -------------------------------------------------
	return (
		<Container>
			<Summary
				idTransactionRoute={idTransactionRoute}
			/>
		</Container>
	)
}
