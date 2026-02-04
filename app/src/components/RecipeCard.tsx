import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import type { Recipe } from '../types';

interface Props {
    recipe: Recipe;
}

export default function RecipeCard({ recipe }: Props) {
    return (
        <Link to={`/receta/${recipe.id}`} style={styles.card}>
            <img src={recipe.image} alt={recipe.title} style={styles.image} />
            <div style={styles.content}>
                <h3 style={styles.title}>{recipe.title}</h3>
                <div style={styles.info}>
                    <span style={styles.badge}>{recipe.difficulty}</span>
                    <span style={styles.time}>
                        <Clock size={16} />
                        {recipe.time} min
                    </span>
                </div>
            </div>
        </Link>
    );
}

const styles: Record<string, React.CSSProperties> = {
    card: {
        display: 'block',
        background: '#fff',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(93,64,55,0.15)',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'all 0.3s ease',
        border: '1px solid #f5f0e8',
    },
    image: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
    },
    content: {
        padding: '1rem',
    },
    title: {
        margin: '0 0 0.5rem',
        fontSize: '1.125rem',
        fontWeight: 600,
    },
    info: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    badge: {
        padding: '0.25rem 0.5rem',
        background: '#f5f0e8',
        color: '#5d4037',
        borderRadius: '6px',
        fontSize: '0.875rem',
        fontWeight: 600,
    },
    time: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        fontSize: '0.875rem',
        color: '#666',
    },
};
