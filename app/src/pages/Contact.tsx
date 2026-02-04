import { Phone } from 'lucide-react';

const contacts = [
    { name: 'Leo Arguello', phone: '614 155 8800' },
    { name: 'Yael Rincones', phone: '614 473 9262' },
    { name: 'Roberto Martinez', phone: '614 110 0185' },
    { name: 'Franco Castillo', phone: '614 405 9497' },
];

export default function Contact() {
    return (
        <div style={styles.page}>
            <h1 style={styles.title}>Contacto</h1>

            <section style={styles.section}>
                <h2 style={styles.subtitle}>Sobre Nosotros</h2>
                <p style={styles.text}>
                    SazonWeb es tu plataforma de recetas con medidas estandarizadas.
                    Nuestro objetivo es eliminar la confusión de medidas mixtas y garantizar
                    que tus recetas siempre salgan perfectas.
                </p>
                <p style={styles.text}>
                    Todas nuestras recetas utilizan el sistema métrico decimal para mayor
                    precisión y consistencia en tus preparaciones.
                </p>
            </section>

            <section style={styles.section}>
                <h2 style={styles.subtitle}>Contacta con nuestro equipo</h2>
                <div style={styles.contacts}>
                    {contacts.map((contact) => (
                        <div key={contact.phone} style={styles.card}>
                            <strong style={styles.name}>{contact.name}</strong>
                            <a href={`tel:${contact.phone.replace(/\s/g, '')}`} style={styles.link}>
                                <Phone size={18} />
                                {contact.phone}
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            <section style={styles.section}>
                <h2 style={styles.subtitle}>Soporte</h2>
                <p style={styles.text}>
                    Para dudas sobre medidas, sugerencias o reportar problemas,
                    no dudes en contactarnos.
                </p>
            </section>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    page: {
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '2rem 1rem',
    },
    title: {
        fontSize: '2.5rem',
        marginBottom: '2rem',
        fontWeight: 700,
        color: '#5d4037',
    },
    section: {
        marginBottom: '3rem',
    },
    subtitle: {
        fontSize: '1.75rem',
        marginBottom: '1rem',
        fontWeight: 600,
        color: '#2d3142',
    },
    text: {
        fontSize: '1.125rem',
        lineHeight: 1.7,
        color: '#555',
        marginBottom: '1rem',
    },
    contacts: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginTop: '1.5rem',
    },
    card: {
        padding: '1.5rem',
        background: 'linear-gradient(135deg, #f5f0e8 0%, #ebe5dc 100%)',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        border: '1px solid #d7ccc8',
    },
    name: {
        fontSize: '1.125rem',
        color: '#5d4037',
    },
    link: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: '#8d6e63',
        textDecoration: 'none',
        fontSize: '1rem',
        fontWeight: 500,
    },
};
