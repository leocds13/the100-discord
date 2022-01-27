import { Box } from "@skynexui/components";
import AppConfig from '../config.json';

export default function NotFoundPage() {
    return (
        <Box styleSheet={{
            display: 'flex',
            backgroundColor: AppConfig.theme.colors.neutrals[500],
            backgroundImage: "url('https://pbs.twimg.com/ext_tw_video_thumb/1273056357357404160/pu/img/JVA1QJ8gpj6mVrrP.jpg')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundBlendMode: "multiply",
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Box
                styleSheet={{
                    width: {
                        md: '50%'
                    },
                    backgroundColor: AppConfig.theme.colors.neutrals[200]
                }}
            >
                box
            </Box>
        </Box>
    );
}