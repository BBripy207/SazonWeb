import { Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from './ui/Box';
import { colors, spacing, fontSize, borderRadius } from '../styles/theme';

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/explorar?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <Box as="form" onSubmit={handleSubmit} style={styles.form}>
            <Box style={styles.container}>
                <Search size={20} style={styles.icon} />
                <input
                    type="text"
                    placeholder="Buscar recetas..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={styles.input}
                />
            </Box>
        </Box>
    );
}

const styles: Record<string, React.CSSProperties> = {
    form: {
        width: '100%',
    },
    container: {
        position: 'relative',
        width: '100%',
    },
    icon: {
        position: 'absolute',
        left: spacing.md,
        top: '50%',
        transform: 'translateY(-50%)',
        color: colors.primary,
    },
    input: {
        width: '100%',
        padding: `0.75rem ${spacing.md} 0.75rem 3rem`,
        fontSize: fontSize.base,
        border: `2px solid ${colors.border}`,
        borderRadius: borderRadius.lg,
        outline: 'none',
        transition: 'border-color 0.3s',
    },
};
