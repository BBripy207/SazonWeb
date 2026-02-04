import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import type { Recipe } from '../types';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../styles/theme';

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
        background: colors.background,
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
        boxShadow: `0 4px 12px ${colors.shadow}`,
        textDecoration: 'none',
        color: 'inherit',
        transition: 'all 0.3s ease',
        border: `1px solid ${colors.backgroundLight}`,
    },
    image: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
    },
    content: {
        padding: spacing.md,
    },
    title: {
        margin: `0 0 ${spacing.sm}`,
        fontSize: fontSize.lg,
        fontWeight: fontWeight.semibold,
    },
    info: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    badge: {
        padding: `${spacing.xs} ${spacing.sm}`,
        background: colors.backgroundLight,
        color: colors.primaryDark,
        borderRadius: borderRadius.sm,
        fontSize: fontSize.sm,
        fontWeight: fontWeight.semibold,
    },
    time: {
        display: 'flex',
        alignItems: 'center',
        gap: spacing.xs,
        fontSize: fontSize.sm,
        color: colors.textLight,
    },
};
