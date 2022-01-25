import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import appConfig from "../config.json";

function GlobalStyle() {
	return (
		<style global jsx>{`
			* {
				margin: 0;
				padding: 0;
				box-sizing: border-box;
				list-style: none;
			}
			body {
				font-family: "Open Sans", sans-serif;
			}

			html,
			body,
			#__next {
				min-height: 100vh;
				display: flex;
				flex: 1;
			}
			#__next {
				flex: 1;
			}
			#__next > * {
				flex: 1;
			}
		`}</style>
	);
}

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

// function HomePage() {
// 	return (
// 		<div>
//             <GlobalStyle />
// 			<Title tag="h1">Boas vindas de volta!</Title>
// 			<h2>Discord - Alura Matrix</h2>
// 		</div>
// 	);
// }

//export default HomePage;

export default function PaginaInicial() {
	const username = "leocds13";

	return (
		<>
			<GlobalStyle />
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
							flex: 1,
							minHeight: "240px",
							marginBottom: "5px",
						}}
					>
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
								color: appConfig.theme.colors.neutrals[200],
								backgroundColor:
									appConfig.theme.colors.neutrals[900],
								padding: "3px 10px",
								borderRadius: "1000px",
							}}
						>
							{username}
						</Text>
					</Box>
					{/* Photo Area */}
					{/* Formulário */}
					<Box
						as="form"
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
						/>
						<Button
							type="submit"
							label="Entrar"
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
							background-position: -260px 0;
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
							background-position: -260px 0;
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
							background-position: -260px 0;
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
							background-position: -260px 0;
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
							background-position: -260px 0;
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
