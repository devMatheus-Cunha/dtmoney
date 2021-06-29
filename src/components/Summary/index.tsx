// style compoent
import { Container } from "./style"

// image
import incomeImg from "../../images/income.svg"
import outcomeImg from "../../images/outcome.svg"
import totalImg from "../../images/total.svg"

export function Summary() {
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
					<img src={outcomeImg} alt="Entradas" />
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
