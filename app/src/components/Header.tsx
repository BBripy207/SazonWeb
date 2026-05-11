import { ChefHat, BookMarked, User as UserIcon, Upload } from 'lucide-react';
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
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import type { MyUser } from '../types';
import { useAuth } from '../Context/AuthContext';
import { useToast } from '../Context/ToastContext';

export default function Header() {
    const loginModal = useModal();
    const registerModal = useModal();
    const { user, login, logout } = useAuth();
    const { showToast } = useToast();
    const location = useLocation();

    const navLink = (path: string): React.CSSProperties => ({
        ...styles.navItem,
        ...(location.pathname.startsWith(path) ? styles.navItemActive : {}),
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);

    // MANUAL LOGIN (School project style)
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .eq('password_hash', password)
            .single();

        if (error || !data) {
            showToast('Correo o contraseña incorrectos', 'error');
        } else {
            login(data); // This updates the global state
            setEmail(''); // Clear form
            setPassword(''); // Clear form
            loginModal.close();
        }
        setLoading(false);
    };

    // MANUAL REGISTER
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { data, error } = await supabase
            .from('users')
            .insert([{
                email,
                password_hash: password,
                username: username
            }])
            .select()
            .single();

        if (error) {
            showToast('Error al registrar: ' + error.message, 'error');
        } else {
            showToast('¡Cuenta creada! Ahora puedes iniciar sesión.', 'success');
            setEmail('');
            setPassword('');
            setUsername('');
            registerModal.close();
            loginModal.open();
        }
        setLoading(false);
    };

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

                    {user ? (
                        <Box style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Text>Hola, {user.username}</Text>
                            <Button onClick={logout} variant="secondary">Salir</Button>
                        </Box>
                    ) : (
                        <Button onClick={loginModal.toggle} variant="primary">Iniciar sesión</Button>
                    )}
                </Box>
            </Box>

            {/* Navigation items */}
            <Box as="nav" style={styles.nav}>
                <Box style={styles.container}>
                    <Box style={styles.navLinks}>
                        <LinkComponent to="/explorar" style={navLink('/explorar')}>
                            <ChefHat size={20} /> <Text as="span">Recetas</Text>
                        </LinkComponent>
                        <LinkComponent to="/mi-recetario" style={navLink('/mi-recetario')}>
                            <BookMarked size={20} /> <Text as="span">Mi Recetario</Text>
                        </LinkComponent>
                        <LinkComponent to="/subir-receta" style={navLink('/subir-receta')}>
                            <Upload size={20} /> <Text as="span">Subir Receta</Text>
                        </LinkComponent>
                        <LinkComponent to="/contacto" style={navLink('/contacto')}>
                            <UserIcon size={20} /> <Text as="span">Contacto</Text>
                        </LinkComponent>
                    </Box>
                </Box>
            </Box>

            {/* LOG-IN MODAL */}
            <Modal isOpen={loginModal.isOpen} onClose={loginModal.close} title="Iniciar sesión">
                <Box as="form" onSubmit={handleLogin} style={styles.form}>
                    <Input type="email" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} required />
                    <Input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
                    <Button type="submit" disabled={loading}>{loading ? 'Cargando...' : 'Entrar'}</Button>
                    <Text style={styles.text}>
                        ¿No tienes cuenta? <span onClick={() => { loginModal.close(); registerModal.toggle(); }} style={styles.link}>Regístrate</span>
                    </Text>
                </Box>
            </Modal>

            {/* SIGN-UP MODAL */}
            <Modal isOpen={registerModal.isOpen} onClose={registerModal.close} title="Crear cuenta">
                <Box as="form" onSubmit={handleRegister} style={styles.form}>
                    <Input type="email" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} required />
                    <Input type="text" placeholder="Nombre de usuario" value={username} onChange={e => setUsername(e.target.value)} required />
                    <Input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
                    <Button type="submit" disabled={loading}>{loading ? 'Creando cuenta...' : 'Registrarse'}</Button>
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
    navItemActive: {
        color: colors.primary,
        borderBottom: `3px solid ${colors.primary}`,
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
