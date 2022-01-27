import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import appConfig from "../config.json";

function Title(props) {
	const Tag = props.tag || "h1";
	return (
		<>
			<Tag>{props.children}</Tag>
			<style jsx>{`
				${Tag} {
					color: ${appConfig.theme.colors.neutrals["000"]};
					font-size: 24px;
					font-weight: 600;
				}
			`}</style>
		</>
	);
}

export default function PaginaInicial() {
	const [username, setUsername] = useState("leocds13");
	const [width, setWidth] = useState(0);
	const roteamento = useRouter();

	useEffect(() => {
		setWidth(window.innerWidth * 0.1);
	}, []);

	const isUsernameValid = username.length > 2

	return (
		<>
			<Box
				styleSheet={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: {
						xs: "column",
						sm: "column",
					},
					backgroundColor: appConfig.theme.colors.primary[500],
					backgroundImage:
						'url("https://wallpaperaccess.com/full/638928.jpg")',
					backgroundRepeat: "no-repeat",
					backgroundPosition: "0px 0px",
					backgroundSize: "110% 100%",
					animation: "animatedBackground 30s linear infinite",
					backgroundBlendMode: "multiply",
				}}
			>
				<Box
					styleSheet={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						flexDirection: "column",
						width: "100%",
						maxWidth: "400px",
						borderRadius: "30px",
						padding: "32px",
						margin: "16px",
						boxShadow: "2px 3px 10px 7px rgb(0 0 0 / 80%)",
						backgroundColor: appConfig.theme.colors.neutrals[700],
					}}
				>
					{/* Header Area */}
					<Box
						styleSheet={{
							width: "100%",
							textAlign: "center",
							justifyContent: "center",
						}}
					>
						<Title>Bem vindo Sky-Crew!</Title>
						<Text
							variant="body3"
							styleSheet={{
								color: appConfig.theme.colors.neutrals[300],
							}}
						>
							{appConfig.name}
						</Text>
					</Box>
					{/* Header Area */}
					{/* Photo Area */}
					<Box
						styleSheet={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							maxWidth: "200px",
							padding: "16px",
							borderRadius: "10px",
							backgroundColor:
								appConfig.theme.colors.neutrals[700],
							borderColor: appConfig.theme.colors.neutrals[900],
							borderWidth: "1px",
							flex: 1,
							minHeight: "240px",
							marginTop: "5px",
						}}
					>
						{isUsernameValid ? (
							<>
								<Image
									styleSheet={{
										borderRadius: "50%",
										marginBottom: "16px",
										boxShadow: `0 0 10px 10px ${appConfig.theme.colors.primary[900]}`,
									}}
									src={`https://github.com/${username}.png`}
								/>
								<Text
									variant="body4"
									styleSheet={{
										color: appConfig.theme.colors
											.neutrals[200],
										backgroundColor:
											appConfig.theme.colors
												.neutrals[900],
										padding: "3px 10px",
										borderRadius: "1000px",
									}}
								>
									{username}
								</Text>
							</>
						) : null}
					</Box>
					{/* Photo Area */}
					{/* Formulário */}
					<Box
						as="form"
						onSubmit={(e) => {
							e.preventDefault();
							roteamento.push("/chat");
						}}
						styleSheet={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							width: { xs: "100%", sm: "75%" },
							textAlign: "center",
						}}
					>
						<TextField
							fullWidth
							textFieldColors={{
								neutral: {
									textColor:
										appConfig.theme.colors.neutrals[200],
									mainColor:
										appConfig.theme.colors.neutrals[900],
									mainColorHighlight:
										appConfig.theme.colors.primary[500],
									backgroundColor:
										appConfig.theme.colors.neutrals[800],
								},
							}}
							name="username"
							value={username}
							onChange={({ target: { value } }) => {
								setUsername(value);
							}}
						/>
						<Button
							type="submit"
							label="Entrar"
							disabled={!isUsernameValid}
							fullWidth
							buttonColors={{
								contrastColor:
									appConfig.theme.colors.neutrals["000"],
								mainColor: appConfig.theme.colors.primary[500],
								mainColorLight:
									appConfig.theme.colors.primary[400],
								mainColorStrong:
									appConfig.theme.colors.primary[600],
							}}
						/>
					</Box>
					{/* Formulário */}
				</Box>
				<Box
					styleSheet={{
						color: appConfig.theme.colors.neutrals[200],
						backgroundColor: appConfig.theme.colors.neutrals[900],
						padding: "10px",
						borderRadius: "1000px",
					}}
				>
					<a href="https://github.com/leocds13">💚 Leonardo Cabral</a>
				</Box>
			</Box>
			<style jsx>
				{`
					a {
						text-decoration: none;
						color: ${appConfig.theme.colors.neutrals[300]};
					}

					@keyframes animatedBackground {
						0% {
							background-position: 0 0;
						}
						50% {
							background-position: -${width.toFixed()}px 0;
						}
						100% {
							background-position: 0 0;
						}
					}
					@-moz-keyframes animatedBackground {
						0% {
							background-position: 0 0;
						}
						50% {
							background-position: -${width.toFixed()}px 0;
						}
						100% {
							background-position: 0 0;
						}
					}
					@-webkit-keyframes animatedBackground {
						0% {
							background-position: 0 0;
						}
						50% {
							background-position: -${width.toFixed()}px 0;
						}
						100% {
							background-position: 0 0;
						}
					}
					@-ms-keyframes animatedBackground {
						0% {
							background-position: 0 0;
						}
						50% {
							background-position: -${width.toFixed()}px 0;
						}
						100% {
							background-position: 0 0;
						}
					}
					@-o-keyframes animatedBackground {
						0% {
							background-position: 0 0;
						}
						50% {
							background-position: -${width.toFixed()}px 0;
						}
						100% {
							background-position: 0 0;
						}
					}
				`}
			</style>
		</>
	);
}
