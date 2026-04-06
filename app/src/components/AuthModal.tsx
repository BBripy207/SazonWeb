import { useState } from 'react';
import { supabase } from '../supabaseClient';
import Box from './ui/Box';
import Input from './ui/Input';
import Button from './ui/Button';
import Heading from './ui/Heading';
import Text from './ui/Text';
import { X } from 'lucide-react';
import { colors, spacing, borderRadius } from '../styles/theme';

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = isSignUp 
            ? await supabase.auth.signUp({ email, password })
            : await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            alert(error.message);
        } else {
            alert(isSignUp ? '¡Revisa tu correo para confirmar!' : '¡Bienvenido!');
            onClose();
        }
        setLoading(false);
    };

    return (
        <Box style={styles.overlay}>
            <Box style={styles.modal}>
                <button onClick={onClose} style={styles.closeBtn}><X /></button>
                <Heading level={2}>{isSignUp ? 'Crear Cuenta' : 'Iniciar Sesión'}</Heading>
                
                <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
                    <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <Input label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Cargando...' : isSignUp ? 'Registrarse' : 'Entrar'}
                    </Button>
                </form>

                <Text style={{ marginTop: spacing.md, textAlign: 'center', cursor: 'pointer' }} onClick={() => setIsSignUp(!isSignUp)}>
                    {isSignUp ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
                </Text>
            </Box>
        </Box>
    );
}

const styles: Record<string, React.CSSProperties> = {
    overlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
    modal: { background: '#fff', padding: spacing.xl, borderRadius: borderRadius.lg, width: '100%', maxWidth: '400px', position: 'relative' },
    closeBtn: { position: 'absolute', top: spacing.md, right: spacing.md, border: 'none', background: 'none', cursor: 'pointer' }
};
