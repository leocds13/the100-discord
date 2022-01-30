import { Box, TextField, Button } from "@skynexui/components";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import appConfig from "../../config.json";
import { ButtonSendSticker } from "../../src/components/ButtonSendSticker";
import { Header } from "../../src/components/chat/Header";
import { LoadingArea } from "../../src/components/chat/LoadingArea";
import { MessageList } from "../../src/components/chat/MensagemList";

const supabaseAnonKey = process.env.SUPABASE_KEY;
const supabaseUrl = process.env.SUPABASE_URL;

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default function ChatPage() {
	const roteamento = useRouter();
	const usuarioLogado = roteamento.query.username;

	// Lógica do field de mensagem
	const [mensagem, setMensagem] = useState("");

	const onMesageChange = ({ target: { value } }) => {
		setMensagem(value);
	};

	const onMensagemKeyPress = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();

			handleNovaMensagem(mensagem);
		}
	};
	// Lógica do field de mensagem

	// Lógica de lista de mensagens
	const [listMensagens, setListaMensagens] = useState(null);

	const events = {
		INSERT(data) {
			setListaMensagens((listaAntiga) => {
				return [data.new, ...listaAntiga];
			});
		},
		DELETE(data) {
			setListaMensagens((listaAntiga) => {
				const novaLista = listaAntiga.filter((value) => {
					return value.id != data.old.id;
				});
				return novaLista;
			});
		},
	};

	useEffect(() => {
		supabaseClient
			.from("mensagens")
			.select("*")
			.order("created_at", { ascending: false })
			.then(({ data }) => {
				setListaMensagens(data);
			});

		supabaseClient
			.from("mensagens")
			.on("*", (data) => {
				if (events[data.eventType]) {
					events[data.eventType](data);
				}
			})
			.subscribe();

		return () => {
			supabaseClient.removeAllSubscriptions();
		};
	}, []);
	// Lógica de lista de mensagens

	// Lógica da tela
	const handleNovaMensagem = (novaMensagem) => {
		const mensagem = {
			de: usuarioLogado,
			texto: novaMensagem,
		};

		if (!(listMensagens === null)) {
			supabaseClient
				.from("mensagens")
				.insert([mensagem])
				.then(() => {
					// console.log("Criando mensagem:" + data);
					// setListaMensagens([data[0], ...listMensagens]);
				})
				.catch((err) => {
					console.log(err);
				});
		}

		setMensagem("");
	};
	// Lógica da tela

	return (
		<Box
			styleSheet={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: appConfig.theme.colors.primary[500],
				backgroundImage: `url(https://wallpaperaccess.com/full/638928.jpg)`,
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				backgroundBlendMode: "multiply",
				color: appConfig.theme.colors.neutrals["000"],
			}}
		>
			<Box
				styleSheet={{
					display: "flex",
					flexDirection: "column",
					flex: 1,
					boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
					borderRadius: "5px",
					backgroundColor: appConfig.theme.colors.neutrals[700],
					height: "100%",
					maxWidth: "95%",
					maxHeight: "95vh",
					padding: "32px",
				}}
			>
				<Header />
				<Box
					styleSheet={{
						position: "relative",
						display: "flex",
						flex: 1,
						height: "80%",
						backgroundColor: appConfig.theme.colors.neutrals[600],
						flexDirection: "column",
						borderRadius: "5px",
						padding: "16px",
					}}
				>
					{listMensagens === null ? (
						<LoadingArea />
					) : (
						<MessageList
							mensagens={listMensagens}
							setListMsg={setListaMensagens}
						/>
					)}

					<Box
						as="form"
						styleSheet={{
							display: "flex",
							alignItems: "center",
						}}
					>
						<TextField
							value={mensagem}
							onChange={onMesageChange}
							onKeyPress={onMensagemKeyPress}
							placeholder="Insira sua mensagem aqui..."
							type="textarea"
							styleSheet={{
								width: "100%",
								height: "100%",
								border: "0",
								resize: "none",
								borderRadius: "5px",
								padding: "6px 8px",
								backgroundColor:
									appConfig.theme.colors.neutrals[800],
								marginRight: "12px",
								color: appConfig.theme.colors.neutrals[200],
							}}
						/>

						<ButtonSendSticker
							onStickerClick={(sticker) => {
								handleNovaMensagem(`:sticker: ${sticker}`);
							}}
						/>

						<Button
							label="Enviar"
							onClick={() => {
								handleNovaMensagem(mensagem);
							}}
							buttonColors={{
								mainColor: appConfig.theme.colors.primary[600],
								contrastColor:
									appConfig.theme.colors.neutrals["000"],
								mainColorLight:
									appConfig.theme.colors.primary[300],
								mainColorStrong:
									appConfig.theme.colors.primary[500],
							}}
							styleSheet={{
								height: "100%",
								marginLeft: "8px",
							}}
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}