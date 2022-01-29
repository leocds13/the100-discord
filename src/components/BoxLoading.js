import { Box } from "@skynexui/components";
import { useEffect, useRef, useState } from "react";
import appConfig from '../../config.json';

export function BoxLoading({ ...props }) {
	const ref = useRef();
	const [dimentions, setDimentions] = useState({ width: 0, height: 0 });

	useEffect(() => {
		if (ref.current) {
			setDimentions({
				width: ref.current.offsetWidth,
				height: ref.current.offsetHeight,
			});
		}
	}, []);

	return (
		<>
			<Box
				styleSheet={{
					backgroundColor: appConfig.theme.colors.neutrals[500],
					...props.style,
					overflow: "auto",
				}}
			>
				<div ref={ref} style={{ width: "100%", height: "100%" }}>
					<Box
						styleSheet={{
							width: "0px",
							height: "100%",
							boxShadow: "0 0 15px 8px rgba(0, 0, 0, 0.8)",
							animation: `loadingBackground${dimentions.width.toString()} 5s normal infinite`,
						}}
					/>
				</div>
			</Box>
			<style jsx>{`
				@keyframes loadingBackground${dimentions.width.toString()} {
					from {
						margin-left: -20px;
					}

					33% {
						margin-left: 80%;
					}

					66% {
						margin-left: 20%;
					}

					to {
						margin-left: ${dimentions.width + 20}px;
					}
				}
			`}</style>
		</>
	);
}