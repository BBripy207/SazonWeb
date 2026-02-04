import { Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.container}>
                <Search size={20} style={styles.icon} />
                <input
                    type="text"
                    placeholder="Buscar recetas..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={styles.input}
                />
            </div>
        </form>
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
        left: '1rem',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#8d6e63',
    },
    input: {
        width: '100%',
        padding: '0.75rem 1rem 0.75rem 3rem',
        fontSize: '1rem',
        border: '2px solid #d7ccc8',
        borderRadius: '12px',
        outline: 'none',
        transition: 'border-color 0.3s',
    },
};
