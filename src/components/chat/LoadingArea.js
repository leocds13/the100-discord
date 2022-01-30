import { Box } from "@skynexui/components";
import { BoxLoading } from "../BoxLoading";

import appConfig from '../../../config.json';

export function LoadingArea() {
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