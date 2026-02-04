import { colors, spacing } from '../styles/theme';

export default function Footer() {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <p style={styles.text}>© 2026 SazonWeb - Recetas Estandarizadas</p>
            </div>
        </footer>
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
