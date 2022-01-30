import { Box, Image, Text } from "@skynexui/components";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";

import appConfig from "../../../config.json";

export function MensagemItem({ mensagem }) {
	const roteamento = useRouter();
	const usuarioLogado = roteamento.query.username;

	const [UserInfo, setUserInfo] = useState({});

	return (
		<Text
			key={mensagem.id}
			tag="li"
			styleSheet={{
				borderRadius: "5px",
				padding: "6px",
				marginBottom: "12px",
				hover: {
					backgroundColor: appConfig.theme.colors.neutrals[700],
				},
			}}
		>
			<Box
				styleSheet={{
					display: "flex",
					justifyContent: "space-between",
					marginBottom: "8px",
				}}
			>
				<Box
					styleSheet={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					{UserInfo.login && (
						<Box
							styleSheet={{
								display: "flex",
								flexDirection: "column",
								minWidth: "70px",
								maxHeight: "200px",
								padding: "6px",
								position: "Absolute",
								marginTop: "-90px",
								marginLeft: "-20px",
								borderRadius: "10px",
								justifyContent: "center",
								alignItems: "center",
								backgroundColor:
									appConfig.theme.colors.neutrals[800],
							}}
							onMouseLeave={() => {
								console.log("Leave");
								setUserInfo({});
							}}
						>
							<Text>{UserInfo.login}</Text>
							<Image
								styleSheet={{
									width: "50px",
									height: "50px",
									borderRadius: "50%",
									display: "inline-block",
									marginRight: "8px",
								}}
								src={`https://github.com/${mensagem.de}.png`}
                                onClick={() => {
                                    window.open(`https://github.com/${mensagem.de}`, '_blank')
                                }}
							/>
							<Text
                                styleSheet={{
                                    width: '120px',
                                    fontSize: '14px',
                                    textAlign: 'center'
                                }}
                            >{UserInfo.name}</Text>
						</Box>
					)}
					<Image
						styleSheet={{
							width: "20px",
							height: "20px",
							borderRadius: "50%",
							display: "inline-block",
							marginRight: "8px",
						}}
						src={`https://github.com/${mensagem.de}.png`}
						onMouseEnter={() => {
							console.log("Enter");
							fetch(`https://api.github.com/users/${mensagem.de}`)
								.then((data) => {
									return data.json();
								})
								.then((data) => {
									setUserInfo(data);
								});
						}}
					/>
					<Text tag="strong">{mensagem.de}</Text>
					<Text
						styleSheet={{
							fontSize: "10px",
							marginLeft: "8px",
							color: appConfig.theme.colors.neutrals[300],
						}}
						tag="span"
					>
						{moment(mensagem.created_at).format(
							"DD/MM/YYYY HH:mm:ss"
						)}
					</Text>
				</Box>
				{usuarioLogado === mensagem.de ? (
					<Button
						label="X"
						variant="tertiary"
						style={{
							height: "20px",
						}}
						onClick={() => {
							supabaseClient
								.from("mensagens")
								.delete()
								.match({ id: mensagem.id })
								.then(() => {});
						}}
					/>
				) : null}
			</Box>
			{mensagem.texto.startsWith(":sticker:") ? (
				<Image
					src={mensagem.texto.replace(":sticker:", "").trim()}
					styleSheet={{
						maxWidth: "150px",
					}}
				/>
			) : (
				mensagem.texto
			)}
		</Text>
	);
}
