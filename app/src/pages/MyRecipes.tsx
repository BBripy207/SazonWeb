import RecipeCard from '../components/RecipeCard';
import Container from '../components/layout/Container';
import PageTitle from '../components/layout/PageTitle';
import { History, Heart } from 'lucide-react';
import logo from '../assets/images/sasonweblogo.png';
import { colors, spacing, fontSize, fontWeight } from '../styles/theme';

const mockSaved = [
    {
        id: '1',
        title: 'Pastel de Chocolate',
        image: logo,
        time: 45,
        difficulty: 'Media' as const,
        category: 'Postres',
        ingredients: [],
        instructions: [],
        servings: 8,
    },
    {
        id: '4',
        title: 'Galletas de Avena',
        image: logo,
        time: 25,
        difficulty: 'Fácil' as const,
        category: 'Postres',
        ingredients: [],
        instructions: [],
        servings: 12,
    },
];

const mockRecent = [
    {
        id: '3',
        title: 'Tacos al Pastor',
        image: logo,
        time: 60,
        difficulty: 'Media' as const,
        category: 'Comida Casera',
        ingredients: [],
        instructions: [],
        servings: 6,
    },
];

export default function MyRecipes() {
    return (
        <Container>
            <PageTitle>Mi Recetario</PageTitle>

            <section style={styles.section}>
                <div style={styles.sectionHeader}>
                    <Heart size={24} />
                    <h2 style={styles.sectionTitle}>Recetas Guardadas</h2>
                </div>
                <div style={styles.grid}>
                    {mockSaved.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            </section>

            <section style={styles.section}>
                <div style={styles.sectionHeader}>
                    <History size={24} />
                    <h2 style={styles.sectionTitle}>Vistas Recientemente</h2>
                </div>
                <div style={styles.grid}>
                    {mockRecent.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            </section>
        </Container>
    );
}

const styles: Record<string, React.CSSProperties> = {
    section: {
        marginBottom: spacing.xxl,
    },
    sectionHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: spacing.lg,
        color: colors.primary,
    },
    sectionTitle: {
        fontSize: fontSize.xxl,
        fontWeight: fontWeight.semibold,
        margin: 0,
        color: colors.primaryDark,
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: spacing.lg,
    },
};
