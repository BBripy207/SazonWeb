import Box from './ui/Box';
import Text from './ui/Text';
import { colors, spacing } from '../styles/theme';

export default function Footer() {
    return (
        <Box as="footer" style={styles.footer}>
            <Box style={styles.container}>
                <Text style={styles.text}>© 2026 SazonWeb - Recetas Estandarizadas</Text>
            </Box>
        </Box>
    );
}

const styles: Record<string, React.CSSProperties> = {
    footer: {
        background: colors.primaryDark,
        color: colors.backgroundLight,
        marginTop: 'auto',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: `${spacing.xl} ${spacing.md}`,
        textAlign: 'center',
    },
    text: {
        margin: 0,
    },
};
