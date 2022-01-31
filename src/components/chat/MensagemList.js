import { Box } from "@skynexui/components";

import appConfig from "../../../config.json";
import { MensagemItem } from "./MensagemItem";

export function MessageList(props) {
	
	return (
		<Box
			tag="ul"
			styleSheet={{
				overflow: "auto",
				display: "flex",
				flexDirection: "column-reverse",
				flex: 1,
				color: appConfig.theme.colors.neutrals["000"],
				marginBottom: "16px",
			}}
		>
			{props.mensagens.map((msg) => {
				return (
					<MensagemItem key={msg.id} mensagem={msg}  />
				);
			})}
		</Box>
	);
}
