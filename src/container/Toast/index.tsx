// style
import "./style.scss";

// type
type AlertProps = {
	type: string;
	content:string;
}

export function ToastNotification({
	type, content,
}:AlertProps) {
	return (
		<>
			<div className="taost-content">
				<img src={type} alt="alerta" />
				<div>{content}</div>
			</div>
		</>
	)
}
