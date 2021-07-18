import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// container
import { ToastNotification } from "../../../container/Toast";

// image
import closeImg from "../../../assets/images/close.svg";
import checkImg from "../../../assets/images/check.svg";

// database
import { database } from "../../../services/firebase";

// style
import { ContainerDeleteTrasaction } from "../style";

// interface
interface NewTransactionModalProps {
  onRequestClose: () => void;
  idTransactionRoute: string;
}

// -------------------------------------------------
// Export Function
// -------------------------------------------------
export function RenderModalClearTable({
	onRequestClose, idTransactionRoute,
}: NewTransactionModalProps) {
	// functions
	async function handleClearTable() {
		onRequestClose()
		toast.success(<ToastNotification
			type={checkImg}
			content="Tabela limpa com sucesso!"
		/>, {
			position: "top-right",
			autoClose: 3500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
		await database.ref(`transactions/${idTransactionRoute}`).remove()
	}

	// -------------------------------------------------
	// Render
	// -------------------------------------------------
	return (
		<>
			<button
				type="button"
				onClick={onRequestClose}
				className="react-modal-close"
			>
				<img src={closeImg} alt="Fechar modal" />
			</button>

			<h2>Confirmar exclusão.</h2>
			<p>Deseja limpar permanentemente esta tabela de transação?</p>
			<ContainerDeleteTrasaction>
				<button
					type="button"
					className="cancel"
					onClick={onRequestClose}
				>
					<span>Cancelar</span>
				</button>
				<button
					type="button"
					className="delete"
					onClick={handleClearTable}
				>
					<span>Excluir</span>
				</button>
			</ContainerDeleteTrasaction>

		</>
	)
}
