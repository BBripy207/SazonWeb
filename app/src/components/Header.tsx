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
import { supabase } from '../supabaseClient';
import { type User } from '@supabase/supabase-js';

const AuthContext = createContext<{ user: User | null; loading: boolean }>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active sessions
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for changes (login/logout)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);



export default function Header() {
    const loginModal = useModal();
    const registerModal = useModal();
    const { user } = useAuth();
    
    // Estados para los formularios
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) alert(error.message);
        else loginModal.close();
        setLoading(false);
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) alert(error.message);
        else {
            alert('¡Revisa tu correo de confirmación!');
            registerModal.close();
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
                        <Button onClick={() => supabase.auth.signOut()} variant="secondary">
                            Cerrar sesión
                        </Button>
                    ) : (
                        <Button onClick={loginModal.toggle} variant="primary">
                            Iniciar sesión
                        </Button>
                    )}
                </Box>
            </Box>

            {/* Navigation items */}
            <Box as="nav" style={styles.nav}>
                <Box style={styles.container}>
                    <Box style={styles.navLinks}>
                        <LinkComponent to="/explorar" style={styles.navItem}>
                            <ChefHat size={20} /> <Text as="span">Recetas</Text>
                        </LinkComponent>
                        <LinkComponent to="/mi-recetario" style={styles.navItem}>
                            <BookMarked size={20} /> <Text as="span">Mi Recetario</Text>
                        </LinkComponent>
                        <LinkComponent to="/subir-receta" style={styles.navItem}>
                            <Upload size={20} /> <Text as="span">Subir Receta</Text>
                        </LinkComponent>
                        <LinkComponent to="/contacto" style={styles.navItem}>
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
