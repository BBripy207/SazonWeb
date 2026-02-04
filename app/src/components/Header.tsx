import { Link } from 'react-router-dom';
import { ChefHat, BookMarked, User, Upload } from 'lucide-react';
import logo from '../assets/images/sasonweblogo.png';
import SearchBar from './SearchBar';
import Modal from './ui/Modal';
import Input from './ui/Input';
import Button from './ui/Button';
import useModal from '../hooks/useModal';
import { colors, spacing, borderRadius, fontWeight } from '../styles/theme';

export default function Header() {
    const { isOpen, toggle, close } = useModal();

    return (
        <header style={styles.header}>
            <div style={styles.topBar}>
                <div style={styles.container}>
                    <Link to="/" style={styles.logoLink}>
                        <img src={logo} alt="SazonWeb" style={styles.logo} />
                    </Link>
                    <div style={styles.searchWrapper}>
                        <SearchBar />
                    </div>
                    <Button onClick={toggle} size="md" variant="primary">
                        Iniciar sesión
                    </Button>
                </div>
            </div>
            <nav style={styles.nav}>
                <div style={styles.container}>
                    <div style={styles.navLinks}>
                        <Link to="/explorar" style={styles.navItem}>
                            <ChefHat size={20} />
                            <span>Recetas</span>
                        </Link>
                        <Link to="/mi-recetario" style={styles.navItem}>
                            <BookMarked size={20} />
                            <span>Mi Recetario</span>
                        </Link>
                        <Link to="/subir-receta" style={styles.navItem}>
                            <Upload size={20} />
                            <span>Subir Receta</span>
                        </Link>
                        <Link to="/contacto" style={styles.navItem}>
                            <User size={20} />
                            <span>Contacto</span>
                        </Link>
                    </div>
                </div>
            </nav>

            <Modal isOpen={isOpen} onClose={close} title="Iniciar sesión">
                <form style={styles.form}>
                    <Input type="email" placeholder="Correo electrónico" required />
                    <Input type="password" placeholder="Contraseña" required />
                    <Button type="submit" variant="primary" size="lg">
                        Entrar
                    </Button>
                    <p style={styles.text}>
                        ¿No tienes cuenta? <a href="#" style={styles.link}>Regístrate</a>
                    </p>
                </form>
            </Modal>
        </header>
    );
}

const styles: Record<string, React.CSSProperties> = {
    header: {
        background: colors.background,
        boxShadow: `0 2px 8px ${colors.shadow}`,
        position: 'sticky',
        top: 0,
        zIndex: 100,
    },
    topBar: {
        background: colors.backgroundGradient,
        padding: `${spacing.md} 0`,
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: `0 ${spacing.md}`,
        display: 'flex',
        alignItems: 'center',
        gap: spacing.xl,
    },
    logoLink: {
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
    },
    logo: {
        height: '60px',
    },
    searchWrapper: {
        flex: 1,
        maxWidth: '600px',
    },
    nav: {
        background: colors.background,
        borderBottom: `1px solid ${colors.secondary}`,
    },
    navLinks: {
        display: 'flex',
        gap: spacing.xl,
        alignItems: 'center',
    },
    navItem: {
        display: 'flex',
        alignItems: 'center',
        gap: spacing.sm,
        padding: `${spacing.md} 0`,
        color: colors.primaryDark,
        textDecoration: 'none',
        fontWeight: fontWeight.semibold,
        borderBottom: '3px solid transparent',
        transition: 'all 0.3s',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: spacing.md,
    },
    text: {
        textAlign: 'center',
        margin: `${spacing.md} 0 0`,
        color: colors.textLight,
    },
    link: {
        color: colors.primary,
        textDecoration: 'none',
        fontWeight: fontWeight.semibold,
    },
};
