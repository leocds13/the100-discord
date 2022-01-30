import { Box, Text } from "@skynexui/components";
import AppConfig from "../config.json";

export default function NotFoundPage() {
	return (
		<Box
			styleSheet={{
				display: "flex",
				backgroundColor: AppConfig.theme.colors.neutrals[500],
				backgroundImage:
					"url('https://pbs.twimg.com/ext_tw_video_thumb/1273056357357404160/pu/img/JVA1QJ8gpj6mVrrP.jpg')",
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				backgroundBlendMode: "multiply",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Box
				styleSheet={{
					width: {
						md: "50%",
					},
					height: {
						md: "50%",
					},
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
                    textAlign: 'center',
					borderRadius: '20px',
					backgroundColor: AppConfig.theme.colors.neutrals[200],
				}}
			>
				<Text
					variant="body1"
					styleSheet={{
						marginBottom: '20px',
					}}
				>
					Parece que você aterrissou junto com a Clark na terra
					inabitavel!
				</Text>
				<Text styleSheet={{marginTop: 15}}>Volte de onde veio e ache seu caminho</Text>
			</Box>
		</Box>
	);
}
