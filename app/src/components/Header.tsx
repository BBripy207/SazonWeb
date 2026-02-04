import { ChefHat, BookMarked, User, Upload } from 'lucide-react';
import logo from '../assets/images/sasonweblogo.png';
import SearchBar from './SearchBar';
import Modal from './ui/Modal';
import Input from './ui/Input';
import Button from './ui/Button';
import Box from './ui/Box';
import Text from './ui/Text';
import Image from './ui/Image';
import LinkComponent from './ui/Link';
import useModal from '../hooks/useModal';
import { colors, spacing, fontWeight } from '../styles/theme';

export default function Header() {
    const { isOpen, toggle, close } = useModal();

    return (
        <Box as="header" style={styles.header}>
            <Box style={styles.topBar}>
                <Box style={styles.container}>
                    <LinkComponent to="/" style={styles.logoLink}>
                        <Image src={logo} alt="SazonWeb" style={styles.logo} />
                    </LinkComponent>
                    <Box style={styles.searchWrapper}>
                        <SearchBar />
                    </Box>
                    <Button onClick={toggle} size="md" variant="primary">
                        Iniciar sesión
                    </Button>
                </Box>
            </Box>
            <Box as="nav" style={styles.nav}>
                <Box style={styles.container}>
                    <Box style={styles.navLinks}>
                        <LinkComponent to="/explorar" style={styles.navItem}>
                            <ChefHat size={20} />
                            <Text as="span">Recetas</Text>
                        </LinkComponent>
                        <LinkComponent to="/mi-recetario" style={styles.navItem}>
                            <BookMarked size={20} />
                            <Text as="span">Mi Recetario</Text>
                        </LinkComponent>
                        <LinkComponent to="/subir-receta" style={styles.navItem}>
                            <Upload size={20} />
                            <Text as="span">Subir Receta</Text>
                        </LinkComponent>
                        <LinkComponent to="/contacto" style={styles.navItem}>
                            <User size={20} />
                            <Text as="span">Contacto</Text>
                        </LinkComponent>
                    </Box>
                </Box>
            </Box>

            <Modal isOpen={isOpen} onClose={close} title="Iniciar sesión">
                <Box as="form" style={styles.form}>
                    <Input type="email" placeholder="Correo electrónico" required />
                    <Input type="password" placeholder="Contraseña" required />
                    <Button type="submit" variant="primary" size="lg">
                        Entrar
                    </Button>
                    <Text style={styles.text}>
                        ¿No tienes cuenta? <Box as="a" href="#" style={styles.link}>Regístrate</Box>
                    </Text>
                </Box>
            </Modal>
        </Box>
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
