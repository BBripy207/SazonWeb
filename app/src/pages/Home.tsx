import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import Container from '../components/layout/Container';
import { ChefHat, Clock, Heart } from 'lucide-react';
import logo from '../assets/images/sasonweblogo.png';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../styles/theme';

const categories = [
    { name: 'Postres', icon: Heart },
    { name: 'Comida Casera', icon: ChefHat },
    { name: 'Rápidas', icon: Clock },
];

const mockRecipes = [
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
        id: '2',
        title: 'Sopa de Verduras',
        image: logo,
        time: 30,
        difficulty: 'Fácil' as const,
        category: 'Comida Casera',
        ingredients: [],
        instructions: [],
        servings: 4,
    },
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

export default function Home() {
    return (
        <Container>
            <section style={styles.hero}>
                <h1 style={styles.title}>Encuentra tu receta perfecta</h1>
                <p style={styles.subtitle}>Medidas estandarizadas para resultados consistentes</p>
                <SearchBar />
            </section>

            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Categorías</h2>
                <div style={styles.categories}>
                    {categories.map((cat) => (
                        <div key={cat.name} style={styles.category}>
                            <cat.icon size={32} />
                            <span>{cat.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Vistos Recientemente</h2>
                <div style={styles.grid}>
                    {mockRecipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            </section>
        </Container>
    );
}

const styles: Record<string, React.CSSProperties> = {
    hero: {
        textAlign: 'center',
        marginBottom: spacing.xxl,
    },
    title: {
        fontSize: fontSize.xxxl,
        margin: `0 0 ${spacing.md}`,
        fontWeight: fontWeight.bold,
        color: colors.primaryDark,
    },
    subtitle: {
        fontSize: fontSize.xl,
        color: colors.textLight,
        marginBottom: spacing.xl,
    },
    section: {
        marginBottom: spacing.xxl,
    },
    sectionTitle: {
        fontSize: fontSize.xxl,
        marginBottom: spacing.lg,
        fontWeight: fontWeight.semibold,
        color: colors.primaryDark,
    },
    categories: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: spacing.md,
    },
    category: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: spacing.sm,
        padding: spacing.lg,
        background: colors.backgroundGradient,
        borderRadius: borderRadius.lg,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: '2px solid transparent',
        color: colors.primary,
        fontWeight: fontWeight.semibold,
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: spacing.lg,
    },
};
