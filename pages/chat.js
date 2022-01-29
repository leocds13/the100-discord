import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import appConfig from "../config.json";
import { BoxLoading } from "../src/components/BoxLoading";
import { ButtonSendSticker } from "../src/components/ButtonSendSticker";

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

function Header() {
	return (
		<>
			<Box
				styleSheet={{
					width: "100%",
					marginBottom: "16px",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<Text variant="heading5">Chat</Text>
				<Button
					variant="tertiary"
					colorVariant="neutral"
					label="Logout"
					href="/"
				/>
			</Box>
		</>
	);
}

function LoadingArea() {
	return (
		<Box
			styleSheet={{
				overflow: "auto",
				display: "flex",
				flexDirection: "column-reverse",
				flex: 1,
				color: appConfig.theme.colors.neutrals["000"],
				marginBottom: "16px",
			}}
		>
			<Box
				tag="div"
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
						marginBottom: "8px",
					}}
				>
					<BoxLoading
						style={{
							width: "20px",
							height: "20px",
							borderRadius: "50%",
							marginRight: "8px",
						}}
					/>
					<BoxLoading
						style={{
							width: "20%",
							height: "20px",
							borderRadius: "5px",
							marginRight: "8px",
						}}
					/>
				</Box>
				<BoxLoading
					style={{
						width: "40%",
						height: "20px",
						borderRadius: "5px",
						marginRight: "8px",
					}}
				/>
			</Box>
		</Box>
	);
}

function MessageList(props) {
	const roteamento = useRouter();
	const usuarioLogado = roteamento.query.username;

	// const [showUserInfo, setShowUserInfo] = useState("");
	const [UserInfo, setUserInfo] = useState({});


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
			{props.mensagens.map((mensagem) => {
				return (
					<Text
						key={mensagem.id}
						tag="li"
						styleSheet={{
							borderRadius: "5px",
							padding: "6px",
							marginBottom: "12px",
							hover: {
								backgroundColor:
									appConfig.theme.colors.neutrals[700],
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
							<Box>
								{UserInfo.login && (
									<Box
										styleSheet={{
											display: "flex",
											flexDirection: 'column',
											minWidth: "70px",
											maxHeight: "90px",
											padding: "6px",
											position: "Absolute",
											marginTop: "-90px",
											marginLeft: "-20px",
											borderRadius: "10px",
											justifyContent: "center",
											alignItems: 'center',
											backgroundColor:
												appConfig.theme.colors
													.neutrals[800],
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
										/>
										<Text>{UserInfo.name}</Text>
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
										fetch(`https://api.github.com/users/${mensagem.de}`)
											.then((data) => {
												return data.json();
											})
											.then((data) => {
												setUserInfo(data);
											});
										// setShowUserInfo(mensagem.de);
									}}
									onMouseLeave={() => {
										setUserInfo({});
										// setShowUserInfo("");
									}}
								/>
								<Text tag="strong">{mensagem.de}</Text>
								<Text
									styleSheet={{
										fontSize: "10px",
										marginLeft: "8px",
										color: appConfig.theme.colors
											.neutrals[300],
									}}
									tag="span"
								>
									{new Date().toLocaleDateString()}
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
								src={mensagem.texto
									.replace(":sticker:", "")
									.trim()}
								styleSheet={{
									maxWidth: "150px",
								}}
							/>
						) : (
							mensagem.texto
						)}
					</Text>
				);
			})}
		</Box>
	);
}
