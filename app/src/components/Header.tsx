import { Link } from 'react-router-dom';
import { ChefHat, BookMarked, User, Upload } from 'lucide-react';
import logo from '../assets/images/sasonweblogo.png';
import SearchBar from './SearchBar';
import { useState } from 'react';

export default function Header() {
    const [showLogin, setShowLogin] = useState(false);

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
                    <button onClick={() => setShowLogin(!showLogin)} style={styles.loginBtn}>
                        Iniciar sesión
                    </button>
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

            {showLogin && (
                <div style={styles.modal} onClick={() => setShowLogin(false)}>
                    <div style={styles.loginBox} onClick={(e) => e.stopPropagation()}>
                        <h2 style={styles.loginTitle}>Iniciar sesión</h2>
                        <form style={styles.form}>
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                style={styles.input}
                            />
                            <input
                                type="password"
                                placeholder="Contraseña"
                                style={styles.input}
                            />
                            <button type="submit" style={styles.submitBtn}>
                                Entrar
                            </button>
                            <p style={styles.text}>¿No tienes cuenta? <a href="#" style={styles.link}>Regístrate</a></p>
                        </form>
                    </div>
                </div>
            )}
        </header>
    );
}

const styles: Record<string, React.CSSProperties> = {
    header: {
        background: '#fff',
        boxShadow: '0 2px 8px rgba(93,64,55,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
    },
    topBar: {
        background: 'linear-gradient(to bottom, #f5f0e8 0%, #ebe5dc 100%)',
        padding: '1rem 0',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
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
    loginBtn: {
        padding: '0.75rem 2rem',
        background: '#8d6e63',
        color: '#fff',
        border: 'none',
        borderRadius: '25px',
        fontWeight: 600,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'background 0.3s',
    },
    nav: {
        background: '#fff',
        borderBottom: '1px solid #e0e0e0',
    },
    navLinks: {
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
    },
    navItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '1rem 0',
        color: '#5d4037',
        textDecoration: 'none',
        fontWeight: 600,
        borderBottom: '3px solid transparent',
        transition: 'all 0.3s',
    },
    modal: {
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    loginBox: {
        background: '#fff',
        padding: '2rem',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '400px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    },
    loginTitle: {
        margin: '0 0 1.5rem',
        color: '#5d4037',
        fontSize: '1.75rem',
        fontWeight: 700,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    input: {
        padding: '0.75rem',
        border: '2px solid #d7ccc8',
        borderRadius: '8px',
        fontSize: '1rem',
    },
    submitBtn: {
        padding: '0.75rem',
        background: '#8d6e63',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 600,
        fontSize: '1rem',
        cursor: 'pointer',
        marginTop: '0.5rem',
    },
    text: {
        textAlign: 'center',
        margin: '1rem 0 0',
        color: '#666',
    },
    link: {
        color: '#8d6e63',
        textDecoration: 'none',
        fontWeight: 600,
    },
};
