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
        background: '#5d4037',
        color: '#f5f0e8',
        marginTop: 'auto',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem',
        textAlign: 'center',
    },
    text: {
        margin: 0,
    },
};
