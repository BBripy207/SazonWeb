import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import Container from '../components/layout/Container';
import Grid from '../components/layout/Grid';
import Box from '../components/ui/Box';
import Text from '../components/ui/Text';
import Heading from '../components/ui/Heading';
import Section from '../components/ui/Section';
import { ChefHat, Clock, Heart } from 'lucide-react';
import mostachon from '../assets/images/mostachon.png';
import enchiladas from '../assets/images/enchiladas_suizas_.png';
import costillas from '../assets/images/costillas bbq.png';
import pizza from '../assets/images/pizza italiana.png';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../styles/theme';

const categories = [
    { name: 'Postres', icon: Heart },
    { name: 'Comida Casera', icon: ChefHat },
    { name: 'Rápidas', icon: Clock },
];

const mockRecipes = [
    {
        id: '1',
        title: 'Mostachones',
        image: mostachon,
        time: 30,
        difficulty: 'Fácil' as const,
        category: 'Postres',
        ingredients: [],
        instructions: [],
        servings: 12,
    },
    {
        id: '2',
        title: 'Enchiladas Suizas',
        image: enchiladas,
        time: 45,
        difficulty: 'Media' as const,
        category: 'Comida Casera',
        ingredients: [],
        instructions: [],
        servings: 4,
    },
    {
        id: '3',
        title: 'Costillas BBQ',
        image: costillas,
        time: 120,
        difficulty: 'Difícil' as const,
        category: 'Comida Casera',
        ingredients: [],
        instructions: [],
        servings: 6,
    },
    {
        id: '4',
        title: 'Pizza Italiana',
        image: pizza,
        time: 60,
        difficulty: 'Media' as const,
        category: 'Internacional',
        ingredients: [],
        instructions: [],
        servings: 4,
    },
];

export default function Home() {
    return (
        <Container>
            <Section style={styles.hero}>
                <Heading level={1} style={styles.title}>Encuentra tu receta perfecta</Heading>
                <Text style={styles.subtitle}>Medidas estandarizadas para resultados consistentes</Text>
                <SearchBar />
            </Section>

            <Section style={styles.section}>
                <Heading level={2} style={styles.sectionTitle}>Categorías</Heading>
                <Grid columns="categories" gap={spacing.md}>
                    {categories.map((cat) => (
                        <Box key={cat.name} style={styles.category}>
                            <cat.icon size={32} />
                            <Text as="span">{cat.name}</Text>
                        </Box>
                    ))}
                </Grid>
            </Section>

            <Section style={styles.section}>
                <Heading level={2} style={styles.sectionTitle}>Vistos Recientemente</Heading>
                <Grid columns="recipes" gap={spacing.lg}>
                    {mockRecipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </Grid>
            </Section>
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
};
